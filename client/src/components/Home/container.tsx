import React, { Fragment, useCallback, useState } from 'react'

import { TypeCreateGame } from '../../interfaces/defaults';
import { HomeComponent } from './component'
import configData from '../../config'
import { TopBarComponent, TopBarLogoComponent } from '../Main/components/component';
import { RequestPost } from '../../common/ApiClient/client';

export default function HomeContainer(){

    const [ errorDisplay, setErrorDisplay ] = useState(false);
    const levels = {
        "beginner": {"rows_number": "9", "cols_number": "9", "mines_number": "9"}, 
        "intermediate": {"rows_number": "16", "cols_number": "16", "mines_number": "25"}, 
        "expert": {"rows_number": "24", "cols_number": "24", "mines_number": "36"}, 
    } as any;

    const handleSubmit = function(event: any) {
        event.preventDefault();

        let obj = {
            ...levels[event.target.id]
        } as TypeCreateGame;

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
}