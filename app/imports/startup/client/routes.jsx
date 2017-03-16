import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BasicLayout from '/imports/components/layout/BasicLayout.jsx';
import MainLayout from '/imports/components/layout/MainLayout.jsx';

import Login from '/imports/components/Users/Login';
import Hello from '/imports/components/Hello';
import Panel from '/imports/components/Users/AdminPanel';

import { isAdmin } from '/imports/api/users';

Meteor.subscribe('userData');

const Admin = isAdmin();

const onlyLoggedIn = (nextState, replace) => {
    if (!Meteor.userId()) {
        replace('/login');
    }
};

const onlyLoggedOut = (nextState, replace) => {
    if (Meteor.userId()) {
        replace('/project');
    }
};

const onlyAdmin = (nextState, replace) => {
    console.log(Admin);
    if (Admin) {
        replace('/project');
    }
};

export default (
    <Route path="/">
        <Route component={MainLayout} onEnter={onlyLoggedIn}>
            <Route path="project" component={Hello} />
        </Route>

        <Route component={MainLayout} onEnter={onlyAdmin}>
            <Route path="admin" component={Panel} />
        </Route>

        <Route component={BasicLayout} onEnter={onlyLoggedOut}>
            <IndexRoute component={Login} />
            <Route path="login" component={Login} />
        </Route>
    </Route>
);

