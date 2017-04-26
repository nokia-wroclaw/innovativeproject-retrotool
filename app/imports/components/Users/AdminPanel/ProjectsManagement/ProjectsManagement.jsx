import CircularProgress from 'material-ui/CircularProgress';
import { browserHistory } from 'react-router';
import { Card, CardTitle } from 'material-ui';
import React, { PropTypes } from 'react';
import ProjectList from './ProjectList';

const ProjectsManagement = (props) => {
    const isAdmin = props.isAdmin;
    if (isAdmin) {
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
    if (!isAdmin) {
        browserHistory.push('/hello');
    }
    return (
        <CircularProgress size={80} thickness={5} />
    );
};

export default ProjectsManagement;

ProjectsManagement.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};
