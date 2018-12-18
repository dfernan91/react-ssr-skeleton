import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App/App/App';
//module
import 'bootstrap';


const renderMethod = ReactDOM.render;


renderMethod((
    <BrowserRouter>
        <App/>
    </BrowserRouter>

),document.getElementById('root'));