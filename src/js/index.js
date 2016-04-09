import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import Main from './components/main';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path='/' component={Main}>
            <Route path='/:command'/>
        </Route>
    </Router>
), document.getElementById('app'));
