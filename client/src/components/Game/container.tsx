import React, { Fragment, useCallback, useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

import GameComponent from './component';
import configData from '../../config'

import { TopBarComponent, TopBarLogoComponent, TopBarProfileComponent, HeaderComponent } from '../Main/components/component';
import { RequestPost, RequestGet, RequestPut } from '../../common/ApiClient/client';
import { TypeGameDataResponse } from '../../interfaces/defaults';

export default function GameContainer(){

    const [cookies] = useCookies(['user']);
    const [ errorDisplay, setErrorDisplay ] = useState(false);
    const [squareRemaining, setSquareRemaining] = React.useState("000");
    const [gameData, setGameData ] = useState<TypeGameDataResponse>({});
    const [ isExpired, setIsExpired ] = React.useState(false);

    let { id } = useParams<any>();

    const addPoints = useCallback((square_remaining) => {

        if (square_remaining < 10)
            return setSquareRemaining("00"+square_remaining);

        if(square_remaining >= 10 && square_remaining < 100)
            return setSquareRemaining("0"+square_remaining);
            
        return setSquareRemaining(`${square_remaining}`)

    }, []);

    const requestCreateNewGame = useCallback(() => {

        (async function() {
            if(gameData && gameData.id){
                  // Build URL
                  let url = configData.MINE_SWEEPER_API.URL;
                  url += configData.MINE_SWEEPER_API.RESOURCES.GAME;
      
                  const response = await RequestPost({url: url,
                      bodyData: {
                          rows_number: gameData.rows_number,
                          cols_number: gameData.cols_number,
                          mines_number: gameData.mines_number
                      }, 
                      header: {
                          headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${cookies.user.access_token}`
                          }
                      } 
                  });
      
                  if (response.status === 201){
                      setErrorDisplay(false);
                      setGameData(response.data);
                      addPoints(response.data.square_remaining);
                      setIsExpired(false);
                      window.history.replaceState(null, "New Game", `/game/${response.data.id}`)
                  }
                  else {
                      setErrorDisplay(true);
                  }
            }
        })()

    }, [gameData]);

    const requestAddRemoveFlagGame = useCallback((row, col) => {
        (async function(row, col) {
             // Build URL
             let url = configData.MINE_SWEEPER_API.URL;
             url += `${configData.MINE_SWEEPER_API.RESOURCES.GAME}${id}/flag`;
 
             const response = await RequestPut({url: url,
                 bodyData: {
                     row: row,
                     col: col
                 }, 
                 header: {
                     headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${cookies.user.access_token}`
                     }
                 } 
             });

             if (response.status == 200){
                setGameData(response.data);
             }
        })(row, col)
    }, []);

    const requestUpdateGame = useCallback((row, col) => {
        (async function(row, col) {
             // Build URL
             let url = configData.MINE_SWEEPER_API.URL;
             url += `${configData.MINE_SWEEPER_API.RESOURCES.GAME}${id}/`;
 
             const response = await RequestPut({url: url,
                 bodyData: {
                     row: row,
                     col: col
                 }, 
                 header: {
                     headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${cookies.user.access_token}`
                     }
                 } 
             });

             if (response.status == 200){
                setGameData(response.data);
             }
        })(row, col)
    }, []);

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
                addPoints(response.data.square_remaining);
            }
            else {
                setErrorDisplay(true);
            }

        })(id)
    }, [])

    useEffect(() => {
        requestRetrieveGame();
        console.log(gameData);
    }, [requestRetrieveGame])

    if(cookies && cookies.user){
        return (
            <Fragment>
                <TopBarComponent>
                <TopBarLogoComponent grid="col-md-9"/>
                <TopBarProfileComponent grid="col-md-3" profileName={cookies.user.user.username} />
                </TopBarComponent>
                <GameComponent 
                    errorDisplay={errorDisplay} 
                    gameData={gameData} 
                    squareRemaining={squareRemaining} 
                    requestCreateNewGame={requestCreateNewGame} 
                    isExpired={isExpired}
                    setIsExpired={setIsExpired}
                    requestUpdateGame={requestUpdateGame}
                    requestAddRemoveFlagGame={requestAddRemoveFlagGame}
                />
            </Fragment>
        )
    }
    else {
        window.location.href = "/signin"
        return (<Fragment></Fragment>)
    }
}