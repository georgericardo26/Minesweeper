import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';

import Routers from './components/Main/Routes'

import 'bootstrap/dist/css/bootstrap.min.css'
import "./assets/style.css";


function App() {
    return(
        <CookiesProvider>
            <BrowserRouter>
                <div className='app-container'>
                      <Routers />
                </div>
            </BrowserRouter>
        </CookiesProvider>
    );
  }
  
export default App;
  