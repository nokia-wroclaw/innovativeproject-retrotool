import { browserHistory } from 'react-router';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { isAdmin } from './methods';


import {
    Card,
    CardActions,
    CardTitle,
    RaisedButton,
} from 'material-ui';


const funk = () => {
    console.log(Meteor.user().isAdmin);
};


const Panel = () => {
    const admin = isAdmin();
    if (admin !== 'loading') {
        if (admin) {
            console.log('is admin', admin);
        } else {
            console.log('is not admin', admin);
            return (
                browserHistory.push('/hello')
            );
        }
    }

    return (
        <Card>
            <CardTitle
                title="Retro Tool- Admin Panel"
                subtitle="Admin"
            />

            <CardActions>
                <RaisedButton
                    label="Check if you are admin"
                    onClick={funk}
                    fullWidth
                />
            </CardActions>
        </Card>
    );
};


export default Panel;
