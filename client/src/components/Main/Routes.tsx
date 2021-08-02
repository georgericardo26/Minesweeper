import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import GameComponent from '../Game/container'
import SignInContainer from '../SignIn/container';
import SignUpContainer from '../SignUp/container'


export default function Routers(){
    return(
        <Switch>
            <Route exact path="/game" component={GameComponent}></Route>
            <Route exact path="/signup" component={SignUpContainer}></Route>
            <Route exact path="/signin" component={SignInContainer}></Route>
            <Redirect from="*" to="/game"></Redirect>
        </Switch>
    )
}
