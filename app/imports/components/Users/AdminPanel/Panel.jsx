import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';
import { browserHistory } from 'react-router';
import { Card, CardTitle } from 'material-ui';
import React from 'react';
import { PropTypes } from 'prop-types';


const setChoiceToUserManage = () => {
    browserHistory.push('/admin/users');
};

const setChoiceToProjectManage = () => {
    browserHistory.push('/admin/projects');
};

const Panel = (props) => {
    const isAdmin = props.isAdmin;

    if (isAdmin) {
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
                    icon={<FontIcon className="muidocs-icon-custom-github" />}
                />
                <RaisedButton
                    onTouchTap={setChoiceToProjectManage}
                    target="_blank"
                    label="Menage Projects"
                    secondary
                    icon={<FontIcon className="muidocs-icon-custom-github" />}
                />
            </Card>
        );
    }
    if (!isAdmin) { browserHistory.push('/hello'); }
    return (
        <CircularProgress size={80} thickness={5} />
    );
};

export default Panel;

Panel.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};
