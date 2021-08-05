import React, { Fragment, useCallback, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

import { TopBarComponent, TopBarLogoComponent, TopBarProfileComponent, HeaderComponent } from '../Main/components/component';
import GameComponent from './component';

import configData from '../../config'
import { RequestPost, RequestGet, RequestPut } from '../../common/ApiClient/client';
import internal from 'node:stream';
import { useEffect } from 'react';

export default function GameContainer(){

    const [cookies] = useCookies(['user']);
    const [ errorDisplay, setErrorDisplay ] = useState(false);
    const [gameData, setGameData ] = useState({});

    let { id } = useParams<any>();

    const requestRetrieveGame = useCallback(() => {

        (async function(id) {

            // Build URL
            let url = configData.MINE_SWEEPER_API.URL;
            url += `${configData.MINE_SWEEPER_API.RESOURCES.GAME}/${id}`;

            const response = await RequestGet({url: url, 
                header: {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookies.user.access_token}`
                    }
                } 
            });

            if (response.status === 200){
                setErrorDisplay(false);
                setGameData(response.data);
            }
            else {
                setErrorDisplay(true);
            }

        })(id)
    }, [])

    useEffect(() => {
        requestRetrieveGame();
    }, [])

    if(cookies && cookies.user){
        return (
            <Fragment>
                <TopBarComponent>
                <TopBarLogoComponent grid="col-md-9"/>
                <TopBarProfileComponent grid="col-md-3" profileName={cookies.user.user.username} />
                </TopBarComponent>
                <GameComponent errorDisplay={errorDisplay} gameData={gameData} />
            </Fragment>
        )
    }
    else {
        window.location.href = "/signin"
        return (<Fragment></Fragment>)
    }
}