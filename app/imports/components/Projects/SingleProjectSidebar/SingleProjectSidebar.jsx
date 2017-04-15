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

const getSprintListItems = (sprints, goToAddSprint, goToSprint, projectId) => {
    const listSprints = sprints.map(sprint => (
        <ListItem
            key={sprint._id}
            primaryText={sprint.name}
            onTouchTap={() => goToSprint(projectId, sprint._id)}
        />
    ));

    listSprints.push(
        <ListItem
            key="addSprint"
            primaryText="Add sprint"
            onTouchTap={() => goToAddSprint(projectId)}
        />,
    );

    return listSprints;
};

const SingleProjectSidebar = (props) => {
    const {
        projectId,
        projects,
        goToPosts,
        goToProject,
        sprints,
        goToAddSprint,
        goToSprint,
    } = props;
    // @TODO if sprints ready, remove Posts ListItem

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
                nestedItems={getSprintListItems(sprints, goToAddSprint, goToSprint, projectId)}
            />
        </List>
    );
};

SingleProjectSidebar.propTypes = {
    projectId: PropTypes.string.isRequired,
    goToProject: PropTypes.func.isRequired,
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
    sprints: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
    goToSprint: PropTypes.func.isRequired,
    goToAddSprint: PropTypes.func.isRequired,
    goToPosts: PropTypes.func.isRequired,
};

export default SingleProjectSidebar;
