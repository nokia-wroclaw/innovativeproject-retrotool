import CircularProgress from 'material-ui/CircularProgress';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Card, CardTitle } from 'material-ui';
import React from 'react';
import { ProjectList } from './ProjectList/projectList.jsx';


const isAdmin = () => {
    const handler = Meteor.subscribe('userData');
    const handler2 = Meteor.subscribe('projectsList');
    this.vireChoice = 'user';


    if (handler.ready() && handler2.ready()) {
        const admin = Meteor.users.findOne({}).isAdmin;
        return admin;
    }
    return 'loading';
};

const UsersManagement = () => {
    const admin = isAdmin();
    if (admin !== 'loading') {
        if (!admin) {
            browserHistory.push('/hello');
        }
        return (
            <Card>
                <CardTitle
                    title="Retro Tool- Admin Panel"
                    subtitle="Projects Management"
                />
                <div>{<ProjectList />}</div>
            </Card>
        );
    }
    return (
        <CircularProgress size={80} thickness={5} />
    );
};

export default UsersManagement;
