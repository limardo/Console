import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import Main from './components/main';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/wordpress/" component={Main}>
        </Route>
    </Router>
), document.getElementById('app'));
