import React, {useEffect, useCallback} from 'react'
import { HeaderComponent } from '../Main/components/component'
import CountUp from 'react-countup';
import { TypeGameOBJ } from '../../interfaces/defaults';

export default function GameComponent(props: TypeGameOBJ) {

    const [seconds, setSeconds] = React.useState("000");
    const { errorDisplay, gameData } = props;

    const ClickEffectFace = useCallback((event) => {

    }, []);

    const ClickEffect = useCallback((event) => {
        event.preventDefault();
        let className = event.target.className;

        if (event.type === 'click') {
            if(className === "value" || className === "mine"){
                return;
            }
            else if(className == "pattern"){
                event.target.style.display = "none";
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
        }
        
    }, []);

    useEffect(() => {

        if(gameData && gameData.created_at) {

            let secondBetweenTwoDate = Math.floor((new Date().getTime() - new Date(gameData.created_at).getTime()) / 1000);
            setSeconds(`${secondBetweenTwoDate}`);

            if (parseInt(seconds) < 999) {
                let seconds_n = parseInt(seconds)
                let seconds_s;
    
                setTimeout(() => {
                    seconds_n += 1;
                    if(seconds_n < 10){
                        return setSeconds("00"+seconds_n);
                    }
                    if(seconds_n >= 10 && seconds_n < 100){
                        return setSeconds("0"+seconds_n);  
                    }
                    return setSeconds(`${seconds_n}`);  
                }, 1000);
            } else {
              setSeconds("000");
            }
        }
        else {
            setSeconds("000");
        }
    });

    return (
        <div className="container">
            <div className="game">
                <div className="game-header">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="panel-score-box">
                                <span>000</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="control-button">
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
                        <tr>
                            <td>
                                <div className="cell" 
                                    onClick={(event) => ClickEffect(event)} 
                                    onContextMenu={(event) => ClickEffect(event)}
                                >
                                    <div className="flag">&nbsp;</div>
                                    <div className="pattern">&nbsp;</div>
                                    <div className="spot-item value">
                                        <span className="color-adj-1"></span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="cell" 
                                    onClick={(event) => ClickEffect(event)} 
                                    onContextMenu={(event) => ClickEffect(event)}
                                >
                                    <div className="flag">&nbsp;</div>
                                    <div className="pattern">&nbsp;</div>
                                    <div className="mine">
                                     &nbsp;
                                    </div>
                                </div>
                            </td>
                           
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}