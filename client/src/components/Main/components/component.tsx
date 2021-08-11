import React, { useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCookies } from 'react-cookie';

import { IProps, ITopBar, IGridOption, TypeProfileTopBar } from '../../../interfaces/defaults'


const TopBarComponent = function(props: ITopBar){

    return (
        <div className="top-bar">
            <div className="container">
                <div className="row">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

const TopBarLogoComponent = function(props: IGridOption){
    return (
        <div className={props.grid}>
            <div className="logo">
                <a className="a-logo" href="/">MineSweeper</a>
            </div>
        </div>
    )
}

const TopBarProfileComponent = function(props: TypeProfileTopBar){
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const logoutFunction = useCallback(() => {
        removeCookie('user');
    }, []);
    return (
        <div className={props.grid}>
            <div className="profile-menu">
                <div className="profile-name">
                    <button type="button" className="profile-button" data-toggle="dropdown">
                        {props.profileName}
                    </button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#" onClick={() => logoutFunction()}>Logout</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const HeaderComponent = function(props: IProps) {
    return (
        <header className="page-header">
                <nav>
                    {props.children}
                </nav>
        </header>
    );
}

const SectionComponent = function (props: IProps){
    return (
        <>{props.children}</>
    )
}

const PageContentComponent = function (props: IProps){
    return (
        <section className="page-content">
            {props.children}
        </section>
    )
}

export { 
    TopBarComponent,
    TopBarLogoComponent,
    TopBarProfileComponent,
    HeaderComponent, 
    SectionComponent,
    PageContentComponent
}
