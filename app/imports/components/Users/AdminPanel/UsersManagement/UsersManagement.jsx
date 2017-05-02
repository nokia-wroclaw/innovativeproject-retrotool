import React from 'react';
import { PropTypes } from 'prop-types';
import { browserHistory } from 'react-router';
import { Card, CardTitle } from 'material-ui';
import CircularProgress from 'material-ui/CircularProgress';
import UsersList from './UsersList';


const UsersManagement = ({ isAdmin }) => {
    if (isAdmin) {
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
    if (!isAdmin) {
        browserHistory.push('/hello');
    }

    return (
        <CircularProgress size={80} thickness={5} />
    );
};

export default UsersManagement;

UsersManagement.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};
