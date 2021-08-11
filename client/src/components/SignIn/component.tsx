import React from 'react';
import { ISignUP } from '../../interfaces/defaults';
import logo from "../../assets/img/logo.jpeg"


const SignInComponent = function(props: ISignUP){

    const { handleSubmit, ErrorDisplay } = props

    return (
        <div className="sign-up-page">
            <div className="container">
                <div className="form-content">
                    <div className="title-content">
                        <h2>Sign In</h2>
                    </div>
                    <form className="sign-up-form" onSubmit={(event) => handleSubmit(event)}>
                        <div className="form-group">
                            <input type="text" className="form-control sign-up-input" placeholder="username" required name="username"></input>
                            <input type="password" className="form-control sign-up-input" placeholder="Password" required name="password"></input>
                        </div>

                        <div className="response-error">
                            {
                                (ErrorDisplay)?
                                <p className="message-error">Something wrong happend, try again later</p>
                                : ""
                            }
                        </div>
                    
                        <button className="btn sign-up-button">LOGIN</button>
                        <p className="create-user-message">
                            Doesn't have a user? Create a new one <a href="/signup">clicking here</a>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    )
}

export { SignInComponent }