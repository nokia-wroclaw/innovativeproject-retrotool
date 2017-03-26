import React, { PropTypes } from 'react';
import {
    List,
    ListItem,
} from 'material-ui';

const getProjectListItems = (projects, onTouchTap) =>
    projects.map(project => (
        <ListItem
            key={project._id}
            primaryText={project.name}
            onTouchTap={() => onTouchTap(project._id)}
        />
    ));

const SingleProjectSidebar = (props) => {
    const {
        projectId,
        projects,
        goToAddSprint,
        goToPosts,
        goToProject,
    } = props;

    return (
        <List>
            <ListItem
                primaryText="Projects"
                nestedItems={getProjectListItems(projects, goToProject)}
            />
            <ListItem
                primaryText="Posts"
                onTouchTap={() => goToPosts(projectId)}
            />
            <ListItem
                primaryText="Sprints"

                nestedItems={[
                    <ListItem key="addSprint" primaryText="Add sprint" onTouchTap={() => goToAddSprint(projectId)} />]}
            />
        </List>
    );
};

SingleProjectSidebar.propTypes = {
    projectId: PropTypes.string.isRequired,
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
    goToAddSprint: PropTypes.func.isRequired,
    goToPosts: PropTypes.func.isRequired,
    goToProject: PropTypes.func.isRequired,
};

export default SingleProjectSidebar;
