import React, { Fragment, useCallback, useEffect, useState } from 'react'

import { ObjFields } from '../../interfaces/defaults';
import { SignInComponent } from './component'
import configData from '../../config'
import { TopBarComponent, TopBarLogoComponent } from '../Main/components/component';
import { RequestPost } from '../../common/ApiClient/client';
import { useCookies } from 'react-cookie';

export default function SignInContainer(){

    const [ inputFields, setInputFields ] = useState<ObjFields>({});
    const [ errorDisplay, setErrorDisplay ] = useState(false);
    const [cookies, setCookie] = useCookies(['user']);

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
            if(Object.keys(inputFields).length) {

                // Build URL
                let url = configData.MINE_SWEEPER_API.URL;
                url += configData.MINE_SWEEPER_API.RESOURCES.AUTH_TOKEN;

                const response = await RequestPost({url: url, bodyData: {
                    client_id: process.env.REACT_APP_MINESWEEPER_API_CLIENT_ID,
                    client_secret: process.env.REACT_APP_MINESWEEPER_CLIENT_SECRET,
                    grant_type: "password",
                    username: inputFields.username,
                    password: inputFields.password
                  }});

                // Empty fields object
                setInputFields({})

                if (response.status === 200) {
                    setErrorDisplay(false);
                    setCookie('user', response.data, {
                        expires: new Date(Date.now() + response.data.expires_in)
                    });
                    window.location.href = "/game";
                }
                else {
                    setErrorDisplay(true);
                }
            }
        })()
    }, [inputFields]);

    useEffect(() => {
        requestCallback();
    }, [requestCallback])

    if (cookies && cookies.user) {
        window.location.href = "/game"
        return (<Fragment></Fragment>)
    }
    else {
        return (
            <Fragment>
                <TopBarComponent>
                    <TopBarLogoComponent grid="col-md-3"/>
                </TopBarComponent>
                <SignInComponent handleSubmit={handleSubmit} ErrorDisplay={errorDisplay} />
            </Fragment>
        )
    }
}