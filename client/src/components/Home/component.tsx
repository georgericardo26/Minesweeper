import React from 'react';
import { IHome } from '../../interfaces/defaults';
import logo from "../../assets/img/logo.jpeg"


const HomeComponent = function(props: IHome){

    const { handleSubmit, ErrorDisplay } = props

    return (
        <div className="home-page">
            <div className="container">
                <div className="form-content">
                    <div className="title-content">
                        <h2>New Game? Tell us how do you want the game?</h2>
                    </div>
                    <form className="new-game-form " onSubmit={(event) => handleSubmit(event)}>
                        <div className="form-group">
                            <input type="number" className="form-control new-game-input" placeholder="rows number" required name="rows_number"></input>
                            <input type="number" className="form-control new-game-input" placeholder="cols number" required name="cols_number"></input>
                            <input type="number" className="form-control new-game-input" placeholder="mines number" required name="mines_number"></input>
                        </div>

                        <div className="response-error">
                            {
                                (ErrorDisplay)?
                                <p className="message-error">Something wrong happend, try again later</p>
                                : ""
                            }
                        </div>
                    
                        <button className="btn new-game-button">Create new game</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export { HomeComponent }