import React, { Fragment } from 'react'
import { useCookies } from 'react-cookie';

import { TopBarComponent, TopBarLogoComponent, TopBarProfileComponent, HeaderComponent } from '../Main/components/component';
import GameComponent from './component';

export default function GameContainer(){

    const [cookies] = useCookies(['user']);

    if(cookies && cookies.user){
        return (
            <Fragment>
                <TopBarComponent>
                <TopBarLogoComponent grid="col-md-9"/>
                <TopBarProfileComponent grid="col-md-3" profileName={cookies.user.user.username} />
                </TopBarComponent>
                <GameComponent />
            </Fragment>
        )
    }
    else {
        window.location.href = "/signin"
        return (<Fragment></Fragment>)
    }
}