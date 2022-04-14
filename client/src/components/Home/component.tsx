import React from 'react';
import { IHome } from '../../interfaces/defaults';


const HomeComponent = function(props: IHome){

    const { handleSubmit, ErrorDisplay } = props

    return (
        <div className="home-page">
            <div className="container">
                <div className="form-content">
                    <div className="title-content">
                        <h2>New Game? Choose the level!</h2>
                    </div>
                    <div className='select-level-field'>
                        <button className="btn new-game-button" id='beginner' onClick={(event) => handleSubmit(event)}>Beginner</button>
                        <button className="btn new-game-button" id='intermediate' onClick={(event) => handleSubmit(event)}>Intermediate</button>
                        <button className="btn new-game-button" id='expert' onClick={(event) => handleSubmit(event)}>Expert</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export { HomeComponent }