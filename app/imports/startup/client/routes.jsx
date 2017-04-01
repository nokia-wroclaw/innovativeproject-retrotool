import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BasicLayout from '/imports/components/layout/BasicLayout.jsx';
import MainLayout from '/imports/components/layout/MainLayout.jsx';

import Login from '/imports/components/Users/Login';
import SingleProject from '/imports/components/Projects/SingleProject';

import Hello from '/imports/components/Hello';
import PostsWall from '/imports/components/Posts/Wall';

import ProjectList from '/imports/components/Projects/ProjectList';
import SingleProjectSidebar from '/imports/components/Projects/SingleProjectSidebar';

import AddSprint from '/imports/components/Sprints/AddSprint';

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
            <Route path="hello" components={{ main: Hello, drawerContent: ProjectList }} />
            <Route path="project">
                <Route path=":projectId" components={{ main: SingleProject, drawerContent: SingleProjectSidebar }} />
                <Route path=":projectId/add-sprint" components={{ main: AddSprint, drawerContent: SingleProjectSidebar }} />
                <Route path=":projectId/wall" components={{ main: PostsWall, drawerContent: SingleProjectSidebar }} />
            </Route>
        </Route>

        <Route component={BasicLayout} onEnter={onlyLoggedOut}>
            <IndexRoute component={Login} />
            <Route path="login" component={Login} />
        </Route>
    </Route>
);
