import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './App';
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Home from "./components/Home";
import UserPage from "./components/UserPage";

import { Route,  BrowserRouter as Router } from 'react-router-dom'


const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/home"   component={Home} />
            <Route
                path="/up"
                component={UserPage}

            />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
