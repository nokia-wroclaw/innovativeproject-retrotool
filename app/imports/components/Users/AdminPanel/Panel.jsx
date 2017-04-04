import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Card, CardTitle } from 'material-ui';
import React from 'react';
import { ViewHandler } from './viewHandler.jsx';


const isAdmin = () => {
    const handler = Meteor.subscribe('userData');
    this.vireChoice = 'user';

    this.styles = {
        button: {
            margin: 12,
        },
        exampleImageInput: {
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            opacity: 0,
        },
    };

    if (handler.ready()) {
        const admin = Meteor.users.findOne({}).isAdmin;
        return admin;
    }
    return 'loading';
};

const setChoiceToUserManage = () => {
    this.vireChoice = 'user';
    console.log(this.vireChoice);
};

const setChoiceToProjectManage = () => {
    this.vireChoice = 'project';
    console.log(this.vireChoice);
};

const Panel = () => {
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
                <RaisedButton
                    onTouchTap={setChoiceToUserManage}
                    target="_blank"
                    label="Menage Users"
                    secondary
                    style={this.styles.button}
                    icon={<FontIcon className="muidocs-icon-custom-github" />}
                />
                <RaisedButton
                    onTouchTap={setChoiceToProjectManage}
                    target="_blank"
                    label="Menage Projects"
                    secondary
                    style={this.styles.button}
                    icon={<FontIcon className="muidocs-icon-custom-github" />}
                />
                <div><ViewHandler vireChoice={this.vireChoice} /></div>
            </Card>
        );
    }
    return (
        <CircularProgress size={80} thickness={5} />
    );
};

export default Panel;
