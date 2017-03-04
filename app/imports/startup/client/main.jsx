import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import routes from './routes.jsx';

const App = () => (
    <MuiThemeProvider>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </MuiThemeProvider>
);

Meteor.startup(() => {
    render(
        <App />,
        document.getElementById('app'),
    );
});
