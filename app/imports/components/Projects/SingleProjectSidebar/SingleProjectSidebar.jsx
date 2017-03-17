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

const getSprintListItems = (sprints, goToAddSprint, projectId) => {
    const listSprints = sprints.map(sprint => (
        <ListItem
            key={sprint._id}
            primaryText={sprint.name}
        />
    ));

    listSprints[listSprints.length] = (
        <ListItem
            key="addSprint"
            primaryText="Add sprint"
            onTouchTap={() => goToAddSprint(projectId)}
        />
    );

    return listSprints;
};

const SingleProjectSidebar = (props) => {
    const { projects, goToProject, projectId, sprints, goToAddSprint } = props;

    return (
        <List>
            <ListItem
                primaryText="Projects"
                nestedItems={getProjectListItems(projects, goToProject)}
            />
            <ListItem primaryText="Posts" />
            <ListItem
                primaryText="Sprints"


                nestedItems={getSprintListItems(sprints, goToAddSprint, projectId)}
            />
        </List>
    );
};

SingleProjectSidebar.propTypes = {
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
    goToProject: PropTypes.func.isRequired,
    projectId: PropTypes.string.isRequired,
    goToAddSprint: PropTypes.func.isRequired,
};

export default SingleProjectSidebar;
