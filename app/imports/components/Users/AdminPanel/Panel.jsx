import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';
import { browserHistory } from 'react-router';
import { Card, CardTitle } from 'material-ui';
import React from 'react';
import { PropTypes } from 'prop-types';


const redirect = (path) => {
    browserHistory.push(path);
};

const Panel = ({ isAdmin }) => {
    if (isAdmin) {
        return (
            <Card>
                <CardTitle
                    title="Retro Tool- Admin Panel"
                    subtitle="Admin"
                />
                <RaisedButton
                    onTouchTap={() => redirect('/admin/users')}
                    target="_blank"
                    label="Manage Users"
                    secondary
                    icon={<FontIcon className="muidocs-icon-custom-github" />}
                />
                <RaisedButton
                    onTouchTap={() => redirect('/admin/projects')}
                    target="_blank"
                    label="Manage Projects"
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
