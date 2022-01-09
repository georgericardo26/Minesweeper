import React, { Fragment, useCallback, useEffect, useState } from 'react'

import { TypeCreateGame } from '../../interfaces/defaults';
import { HomeComponent } from './component'
import configData from '../../config'
import { TopBarComponent, TopBarLogoComponent } from '../Main/components/component';
import { RequestPost } from '../../common/ApiClient/client';
import { useCookies } from 'react-cookie';

export default function HomeContainer(){

    // const [ inputFields, setInputFields ] = useState<TypeCreateGame>({});
    const [ errorDisplay, setErrorDisplay ] = useState(false);
    const [cookies] = useCookies(['user']);
    const [newGame, setNewGame] = useState(false);

    const handleSubmit = function(event: any) {
        event.preventDefault();
        
        let obj = {} as TypeCreateGame;

        // Get input fields inserting to OBJ
        for (const item of event.target){
            obj[item["name"] as keyof TypeCreateGame] = item["value"]
        }

        requestCreateNewGameCallback(obj);
    }

    const requestCreateNewGameCallback = useCallback((obj:TypeCreateGame) => {

        (async function(obj:TypeCreateGame) {
          
            // Build URL
            let url = configData.MINE_SWEEPER_API.URL;
            url += configData.MINE_SWEEPER_API.RESOURCES.GAME;

            const response = await RequestPost({url: url, 
                header: {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${cookies.user.access_token}`
                    }
                },
                bodyData: {
                    rows_number: obj.rows_number,
                    cols_number: obj.cols_number,
                    mines_number: obj.mines_number
                }
            });

            if (response.status === 201) {
                window.location.href = `/game/${response.data.id}`;
            }
            else {
                setErrorDisplay(true);
            }

        })(obj);
    }, []);

    // if (cookies && cookies.user) {
     return (
         <Fragment>
             <TopBarComponent>
                 <TopBarLogoComponent grid="col-md-3"/>
             </TopBarComponent>
             <HomeComponent 
                 handleSubmit={handleSubmit} 
                 ErrorDisplay={errorDisplay} 
             />
         </Fragment>
     )
    // }
    // else {
    //     window.location.href = "/signin"
    //     return (<Fragment></Fragment>)
    // }
}