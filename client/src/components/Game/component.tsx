import React, {useEffect, useCallback} from 'react'
import { HeaderComponent } from '../Main/components/component'
import CountUp from 'react-countup';

export default function GameComponent() {

    const [seconds, setSeconds] = React.useState(0);
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
        if (seconds < 999) {
          setTimeout(() => setSeconds(seconds + 1), 1000);
        } else {
          setSeconds(0);
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
                                <div className="control-face control-face-normal">
                                    &nbsp;
                                </div>
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