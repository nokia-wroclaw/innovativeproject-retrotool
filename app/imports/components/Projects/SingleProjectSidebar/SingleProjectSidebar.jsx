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

<<<<<<< HEAD
const getSprintListItems = (sprints, goToAddSprint, projectId) => {
=======
const getSprintListItems = (sprints, goToAddSprint, goToSprint, projectId) => {
>>>>>>> origin/devel
    const listSprints = sprints.map(sprint => (
        <ListItem
            key={sprint._id}
            primaryText={sprint.name}
<<<<<<< HEAD
=======
            onTouchTap={() => goToSprint(projectId, sprint._id)}
>>>>>>> origin/devel
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
<<<<<<< HEAD
    const { projects, goToProject, projectId, sprints, goToAddSprint } = props;
=======
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
>>>>>>> origin/devel

    return (
        <List>
            <ListItem
                primaryText="Projects"
                nestedItems={getProjectListItems(projects, goToProject)}
            />
<<<<<<< HEAD
            <ListItem primaryText="Posts" />
            <ListItem
                primaryText="Sprints"
                nestedItems={getSprintListItems(sprints, goToAddSprint, projectId)}
=======
            <ListItem
                primaryText="Posts"
                onTouchTap={() => goToPosts(projectId)}
            />
            <ListItem
                primaryText="Sprints"
                nestedItems={getSprintListItems(sprints, goToAddSprint, goToSprint, projectId)}
>>>>>>> origin/devel
            />
        </List>
    );
};

SingleProjectSidebar.propTypes = {
<<<<<<< HEAD
=======
    projectId: PropTypes.string.isRequired,
    goToProject: PropTypes.func.isRequired,
>>>>>>> origin/devel
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
<<<<<<< HEAD
    goToProject: PropTypes.func.isRequired,
    projectId: PropTypes.string.isRequired,
    goToAddSprint: PropTypes.func.isRequired,
=======
    goToSprint: PropTypes.func.isRequired,
    goToAddSprint: PropTypes.func.isRequired,
    goToPosts: PropTypes.func.isRequired,
>>>>>>> origin/devel
};

export default SingleProjectSidebar;
