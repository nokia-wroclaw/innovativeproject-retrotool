import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BasicLayout from '/imports/components/layout/BasicLayout.jsx';
import MainLayout from '/imports/components/layout/MainLayout.jsx';

import Login from '/imports/components/Users/Login';

import Hello from '/imports/components/Hello'; // @todo add some content or replace with something else

const onlyLoggedIn = (nextState, replace) => {
    if (!Meteor.userId()) {
        replace('/login');
    }
};

const onlyLoggedOut = (nextState, replace) => {
    if (Meteor.userId()) {
        replace('/hello');
    }
};

export default (
    <Route path="/">
        <Route component={MainLayout} onEnter={onlyLoggedIn}>
            <Route path="hello" component={Hello} />
            <Route path="project" />
        </Route>

        <Route component={BasicLayout} onEnter={onlyLoggedOut}>
            <IndexRoute component={Login} />
            <Route path="login" component={Login} />
        </Route>
    </Route>
);
