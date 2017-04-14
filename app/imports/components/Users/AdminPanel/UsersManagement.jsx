import CircularProgress from 'material-ui/CircularProgress';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Card, CardTitle } from 'material-ui';
import React from 'react';
import { UsersList } from './UsersList/usersList.jsx';


const isAdmin = () => {
    const handler = Meteor.subscribe('userData');
    this.vireChoice = 'user';

    if (handler.ready()) {
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
                    subtitle="Admin"
                />
                <div>{<UsersList />}</div>
            </Card>
        );
    }
    return (
        <CircularProgress size={80} thickness={5} />
    );
};

export default UsersManagement;
