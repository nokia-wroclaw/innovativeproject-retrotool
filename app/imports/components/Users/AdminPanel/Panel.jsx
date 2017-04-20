import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';
import { browserHistory } from 'react-router';
import { Card, CardTitle } from 'material-ui';
import React, { PropTypes } from 'react';


const setChoiceToUserManage = () => {
    browserHistory.push('/admin/users');
};

const setChoiceToProjectManage = () => {
    browserHistory.push('/admin/projects');
};

const Panel = (props) => {
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

    const admin = props.admin;

    console.log('In Panel ', admin);

    if (admin) {
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
            </Card>
        );
    }
    return (
        <CircularProgress size={80} thickness={5} />
    );
};

export default Panel;

Panel.propTypes = {
    admin: PropTypes.bool.isRequired,
};
