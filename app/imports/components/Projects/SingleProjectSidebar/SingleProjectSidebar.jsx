import React from 'react';
import PropTypes from 'prop-types';
import {
    List,
    ListItem,
} from 'material-ui';
import { renderProjectListItems } from '/imports/components/Projects/ProjectList';

const renderSprintLinks = (
    projectId,
    sprintId,
    {
        goToSprint,
        goToPosts,
        goToWorkingAgreements,
        goToActionItems,
    },
) => [
    <ListItem
        key={'summary'}
        primaryText="Sprint summary"
        onTouchTap={() => goToSprint(projectId, sprintId)}
    />,
    <ListItem
        key={'posts'}
        primaryText="Posts"
        onTouchTap={() => goToPosts(projectId, sprintId)}
    />,
    <ListItem
        key={'working-agreements'}
        primaryText="Working agreements"
        onTouchTap={() => goToWorkingAgreements(projectId, sprintId)}
    />,
    <ListItem
        key={'action-items'}
        primaryText="Action Items"
        onTouchTap={() => goToActionItems(projectId, sprintId)}
    />,
];

const renderSprintListItems = (
    sprints,
    goToAddSprint,
    goToSprint,
    projectId,
    sprintActions,
    showAddSprint = false,
) => {
    const listSprints = sprints.map(sprint => (
        <ListItem
            key={sprint._id}
            primaryText={sprint.name}
            onTouchTap={() => goToSprint(projectId, sprint._id)}
            nestedItems={renderSprintLinks(projectId, sprint._id, sprintActions)}
        />
    ));

    if (showAddSprint) {
        listSprints.push(
            <ListItem
                key="addSprint"
                primaryText="Add sprint"
                onTouchTap={() => goToAddSprint(projectId)}
            />,
        );
    }

    return listSprints;
};

const SingleProjectSidebar = (props) => {
    const {
        projectId,
        projects,
        sprints,
        goToActionItems,
        goToAddProject,
        goToAddSprint,
        goToPosts,
        goToProject,
        goToSprint,
        goToWorkingAgreements,
        currentSprintId,
        showAddSprint,
        showCreateLink,
    } = props;

    const sprintActions = {
        goToActionItems,
        goToPosts,
        goToSprint,
        goToWorkingAgreements,
    };

    return (
        <List>
            <ListItem
                primaryText="Projects"
                nestedItems={
                    renderProjectListItems(projects, goToProject, showCreateLink, goToAddProject)
                }
            />
            {currentSprintId && renderSprintLinks(projectId, currentSprintId, sprintActions)}
            <ListItem
                primaryText="Sprints"
                nestedItems={renderSprintListItems(
                    sprints, goToAddSprint, goToSprint, projectId, sprintActions, showAddSprint,
                )}
            />
        </List>
    );
};

SingleProjectSidebar.propTypes = {
    currentSprintId: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
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
    showAddSprint: PropTypes.bool.isRequired,
    showCreateLink: PropTypes.bool.isRequired,
    goToActionItems: PropTypes.func.isRequired,
    goToAddProject: PropTypes.func.isRequired,
    goToAddSprint: PropTypes.func.isRequired,
    goToPosts: PropTypes.func.isRequired,
    goToProject: PropTypes.func.isRequired,
    goToSprint: PropTypes.func.isRequired,
    goToWorkingAgreements: PropTypes.func.isRequired,
};

SingleProjectSidebar.defaultProps = {
    currentSprintId: '',
    goToActionItems() {},
    goToAddProject() {},
    goToAddSprint() {},
    goToPosts() {},
    goToProject() {},
    goToSprint() {},
    goToWorkingAgreements() {},
    showAddSprint: false,
};

export default SingleProjectSidebar;
