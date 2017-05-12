import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { isAdmin } from '/imports/api/users';
import BasicLayout from '/imports/components/layout/BasicLayout.jsx';
import MainLayout from '/imports/components/layout';

import Login from '/imports/components/Users/Login';
import SingleProject from '/imports/components/Projects/SingleProject';

import Hello from '/imports/components/Hello';
import PostsWall from '/imports/components/Posts/Wall';

import ProjectList from '/imports/components/Projects/ProjectList';
import SingleProjectSidebar from '/imports/components/Projects/SingleProjectSidebar';

import CreateNewProject from '/imports/components/Projects/CreateNewProject';
import AddSprint from '/imports/components/Sprints/AddSprint';
import SingleSprint from '/imports/components/Sprints/SingleSprint';

import ActionItems from '/imports/components/ActionItems/ActionItemsBoard';
import WorkingAgreements from '/imports/components/WorkingAgreements/WorkingAgreementBoard';

import Profile from '/imports/components/Users/Profile';

import AdminPanel from '/imports/components/Users/AdminPanel';

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

const onlyAdmin = (nextState, replace) => {
    if (!isAdmin()) {
        replace('/hello');
    }
};

export default (
    <Route path="/">
        <Route component={MainLayout} onEnter={onlyLoggedIn}>
            <Route path="admin" onEnter={onlyAdmin}>
                <Route path="main" component={{ main: AdminPanel, drawerContent: ProjectList }} />
            </Route>
            <Route
                path="create"
                components={{ main: CreateNewProject, drawerContent: ProjectList }}
            />
            <Route path="hello" components={{ main: Hello, drawerContent: ProjectList }} />
            <Route path="profile" component={{ main: Profile, drawerContent: ProjectList }} />
            <Route path="project">
                <Route
                    path=":projectId"
                    components={{ main: SingleProject, drawerContent: SingleProjectSidebar }}
                />
                <Route
                    path=":projectId/add-sprint"
                    components={{ main: AddSprint, drawerContent: SingleProjectSidebar }}
                />
                <Route
                    path=":projectId/sprint/:sprintId"
                    components={{ main: SingleSprint, drawerContent: SingleProjectSidebar }}
                />
                <Route
                    path=":projectId/sprint/:sprintId/wall"
                    components={{ main: PostsWall, drawerContent: SingleProjectSidebar }}
                />
                <Route
                    path=":projectId/sprint/:sprintId/action-items"
                    components={{ main: ActionItems, drawerContent: SingleProjectSidebar }}
                />
                <Route
                    path=":projectId/sprint/:sprintId/working-agreement"
                    components={{ main: WorkingAgreements, drawerContent: SingleProjectSidebar }}
                />
            </Route>
        </Route>

        <Route component={BasicLayout} onEnter={onlyLoggedOut}>
            <IndexRoute component={Login} />
            <Route path="login" component={Login} />
        </Route>
    </Route>
);
