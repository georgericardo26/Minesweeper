import React, { Fragment, useCallback, useEffect, useState } from 'react'

import { ObjFields } from '../../interfaces/defaults';
import { SignUpComponent } from './component'
import configData from '../../config'
import { TopBarComponent, TopBarLogoComponent } from '../Main/components/component';
import { RequestPost } from '../../common/ApiClient/client';

export default function SignUpContainer(){

    const [ inputFields, setInputFields ] = useState<ObjFields>({});
    const [ errorDisplay, setErrorDisplay ] = useState(false);

    const handleSubmit = function(event: any) {
        event.preventDefault();
        
        let obj = {} as ObjFields;

        // Get input fields inserting to OBJ
        for (const item of event.target){
            obj[item["name"] as keyof ObjFields] = item["value"]
        }
        setInputFields(obj)
    }

    const requestCallback = useCallback(() => {

        (async function() {
            if(Object.keys(inputFields).length){

                // Build URL
                let url = configData.MINE_SWEEPER_API.URL;
                url += configData.MINE_SWEEPER_API.RESOURCES.USER;

                const response = await RequestPost({url: url, bodyData: {
                    username: inputFields.username,
                    password: inputFields.password
                }});

                // Empty fields object
                setInputFields({})

                console.log(response)

                if (response.status === 201){
                    setErrorDisplay(false);
                    window.location.href = "/signin";
                }
                else {
                    setErrorDisplay(true);
                }

            }
        })()
    }, [inputFields])

    useEffect(() => {
        requestCallback();
    }, [requestCallback])


    return (
        <Fragment>
            <TopBarComponent>
                <TopBarLogoComponent grid="col-md-3"/>
            </TopBarComponent>
            <SignUpComponent handleSubmit={handleSubmit} ErrorDisplay={errorDisplay} />
        </Fragment>
    )
}