import React from 'react';
import { Meteor } from 'meteor/meteor';

import {
    Card,
    CardActions,
    CardTitle,
    RaisedButton,
} from 'material-ui';

Meteor.subscribe('userData');

const funk = () => {
    const user = Meteor.user().isAdmin;
    console.log(user);
};

const Panel = () => (
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

Panel.propTypes = {};

export default Panel;
