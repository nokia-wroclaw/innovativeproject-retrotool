import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from './routes.jsx';

const App = () => (
    <Router history={browserHistory}>
        {routes}
    </Router>
);

Meteor.startup(() => {
    render(
        <App />,
        document.getElementById('app'),
    );
});
