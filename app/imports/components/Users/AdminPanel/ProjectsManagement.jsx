import CircularProgress from 'material-ui/CircularProgress';
import { browserHistory } from 'react-router';
import { Card, CardTitle } from 'material-ui';
import React, { PropTypes } from 'react';
import { ProjectList } from './ProjectList/projectList.jsx';


const ProjectsManagement = (props) => {
    const admin = props.admin;
    if (admin) {
        if (!admin) {
            browserHistory.push('/hello');
        }
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
    return (
        <CircularProgress size={80} thickness={5} />
    );
};

export default ProjectsManagement;

ProjectsManagement.propTypes = {
    admin: PropTypes.bool.isRequired,
};
