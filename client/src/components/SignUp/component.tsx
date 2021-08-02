import React from 'react';
import { ISignUP } from '../../interfaces/defaults';

const SignUpComponent = function(props: ISignUP){

    const { handleSubmit, ErrorDisplay } = props

    return (
        <div className="sign-up-page">
            <div className="container">
                <div className="form-content">
                    <div className="title-content">
                        <h2>Sign Up</h2>
                    </div>
                    <form className="sign-up-form" onSubmit={(event) => handleSubmit(event)}>
                        <div className="form-group">
                            <input type="text" className="form-control sign-up-input" placeholder="Username" name="username"></input>
                            <input type="password" className="form-control sign-up-input" placeholder="Password" required name="password"></input>
                            <input type="password" className="form-control sign-up-input" placeholder="Re-Type Password" required name="re_password"></input>
                        </div>

                        <div className="response-error">
                            {
                                (ErrorDisplay)?
                                <p className="message-error">Something wrong happend, try again later</p>
                                : ""
                            }
                        </div>

                        <button className="btn sign-up-button">REGISTER</button>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export { SignUpComponent }