import React, {useEffect, useCallback} from 'react'
import { TypeGameOBJ, TypeSquare } from '../../interfaces/defaults';
import demo from "../../assets/img/demo.jpeg";

export default function GameComponent(props: TypeGameOBJ) {

    const [seconds, setSeconds] = React.useState("000");
    const { 
        gameData, 
        requestCreateNewGame, 
        isExpired, 
        setIsExpired,
        requestUpdateGame,
        requestAddRemoveFlagGame 
    } = props;

    const ClickEffect = useCallback((event, row, col, gameDataId) => {
        event.preventDefault();
        let className = event.target.className;

        if(!gameData.end_game){
            if (event.type === 'click') {
                if(className === "value" || className === "mine"){
                    return;
                }
                else if(className == "pattern"){
                    event.target.style.display = "none";
                    requestUpdateGame(row, col, gameDataId);
                }
            } else if (event.type === 'contextmenu') {
                let element;
    
                if(className === "pattern"){
                    element = event.target.previousElementSibling;
                }
                else if(className === "flag") {
                    element = event.target;
                }
                else {
                    return;
                }
        
                if(element.style.display && element.style.display === "block"){
                    element.style.display = "none";
                }
                else {
                    element.style.display = "block";
                }
                console.log("testing...");
                requestAddRemoveFlagGame(row, col, gameDataId);
            }
        }
    }, []);

    useEffect(() => {
        if (parseInt(seconds) < 999) {

            if(gameData && gameData.created_at && !isExpired && !gameData.end_game) {
                let secondBetweenTwoDate = Math.floor((new Date().getTime() - new Date(gameData.created_at).getTime()) / 1000);
                secondBetweenTwoDate += 1;
                let seconds_string:string;

                if(secondBetweenTwoDate < 10){
                    seconds_string = `00${secondBetweenTwoDate}`
                }
                else if(secondBetweenTwoDate >= 10 && secondBetweenTwoDate < 100){
                    seconds_string = `0${secondBetweenTwoDate}`
                }
                else {
                    seconds_string = `${secondBetweenTwoDate}`
                }
                
                setTimeout(() => setSeconds(seconds_string), 1000);
            }
            else {
                setSeconds("000");
            }

        } else {
          setSeconds("000");
          setIsExpired(true);
        }
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="game">
                        <div className="game-header">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="panel-score-box">
                                        <span>{gameData.square_remaining}</span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="control-button" onClick={()=>(requestCreateNewGame())}>
                                        {(gameData.end_game && !gameData.is_winner)?
                                            <div className="control-face control-face-lose">
                                                &nbsp;
                                            </div>: 
                                        (gameData.end_game && gameData.is_winner) ?
                                            <div className="control-face control-face-win">
                                                &nbsp;
                                            </div> :
                                        <div className="control-face control-face-normal">
                                                &nbsp;
                                        </div>
                                        }
                                    
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="panel-time-box">
                                        <span>{seconds}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="game-content">
                            <table className="board">
                                <tbody>

                                    {
                                        (gameData && gameData.rows)?
                                            gameData.rows.map((row: any)=>(
                                                <tr>
                                                    {row.square_items.map((square:TypeSquare)=>(
                                                        <td>
                                                            <div className="cell"
                                                            key={`${row.index},${square.index}`} 
                                                            onClick={(event) => ClickEffect(event, row.index, square.index, gameData.id)} 
                                                            onContextMenu={(event) => ClickEffect(event, row.index, square.index, gameData.id)}
                                                            >
                                                                <div className="flag" style={(square.is_flaged && !square.is_selected)? {display: "block"} : {display: "none"}}>&nbsp;</div>
                                                                <div className="pattern" style={(square.is_selected)? {display: "none"} : {display: "block"}}>&nbsp;</div>
                                                                {
                                                                    (square.is_mine)? 
                                                                    <div className="spot-item mine">
                                                                        &nbsp;
                                                                    </div>
                                                                    : 
                                                                    <div className="spot-item value">
                                                                        {
                                                                            (square.adj_mines == 0)? "" :
                                                                            (square.adj_mines == 1)? <span className="color-adj-1">{square.adj_mines}</span> :
                                                                            (square.adj_mines == 2)? <span className="color-adj-2">{square.adj_mines}</span> :
                                                                            (square.adj_mines == 3)? <span className="color-adj-3">{square.adj_mines}</span> :
                                                                            <span className="color-adj-4">{square.adj_mines}</span>
                                                                        }
                                                                    </div>
                                                                }
                                                            </div>
                                                        </td>
                                                    ))}
                                                </tr>
                                        )) : 
                                        <tr>
                                            <td key="error">Error trying to process the request</td>
                                        </tr>
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    
                    <div className="instructions-area">
                        <h2>Instructions</h2>
                        <div className="area-1">
                            <img src={demo}></img>
                        </div>
                        <h2>New game with different level?</h2>
                        <a className="btn new-game-button" href="/">Click Here</a>
                    </div>
                </div>
            </div>
        </div>
    )
}