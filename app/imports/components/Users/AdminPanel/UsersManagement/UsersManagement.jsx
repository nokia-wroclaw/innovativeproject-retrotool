import CircularProgress from 'material-ui/CircularProgress';
import { browserHistory } from 'react-router';
import { Card, CardTitle } from 'material-ui';
import React, { PropTypes } from 'react';
import UsersList from './UsersList';

const UsersManagement = (props) => {
    const admin = props.admin;

    if (admin) {
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
    if (!admin) {
        browserHistory.push('/hello');
    }

    return (
        <CircularProgress size={80} thickness={5} />
    );
};

export default UsersManagement;

UsersManagement.propTypes = {
    admin: PropTypes.bool.isRequired,
};
