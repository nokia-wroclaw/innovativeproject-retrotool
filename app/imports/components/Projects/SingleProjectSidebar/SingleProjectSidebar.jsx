import React from 'react';
import PropTypes from 'prop-types';
import {
    Divider,
    List,
    ListItem,
    Subheader,
} from 'material-ui';
import Assignment from 'material-ui/svg-icons/action/assignment';
import AssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import DirectionsRun from 'material-ui/svg-icons/maps/directions-run';
import LibraryAdd from 'material-ui/svg-icons/av/library-add';
import Lock from 'material-ui/svg-icons/action/lock';
import Forum from 'material-ui/svg-icons/communication/forum';

import { renderProjectListItems } from '/imports/components/Projects/ProjectList';

const renderSprintLinks = (
    projectId,
    sprintId,
    sprintName,
    isSprintClosed,
    {
        goToSprint,
        goToPosts,
        goToWorkingAgreements,
        goToActionItems,
    },
    withSubheader = true,
) =>
    <div>
        {withSubheader && <Divider />}
        {withSubheader && <Subheader>{sprintName} {isSprintClosed ? ' [CLOSED]' : ''}</Subheader>}
        <ListItem
            leftIcon={<Dashboard />}
            primaryText="Sprint summary"
            onTouchTap={() => goToSprint(projectId, sprintId)}
        />
        <ListItem
            leftIcon={<Forum />}
            primaryText="Posts"
            onTouchTap={() => goToPosts(projectId, sprintId)}
        />
        <ListItem
            leftIcon={<AssignmentTurnedIn />}
            primaryText="Working agreements"
            onTouchTap={() => goToWorkingAgreements(projectId, sprintId)}
        />
        <ListItem
            leftIcon={<Assignment />}
            primaryText="Action Items"
            onTouchTap={() => goToActionItems(projectId, sprintId)}
        />
    </div>
;

const renderSprintListItems = (
    sprints,
    goToAddSprint,
    currentSprintName,
    goToSprint,
    projectId,
    showAddSprint = false,
) => {
    const openSprints = sprints.filter(sprint => !sprint.closed);
    const closedSprints = sprints.filter(sprint => sprint.closed);

    const listSprints = openSprints.map(sprint => (
        <ListItem
            leftIcon={sprint.closed ? <Lock /> : <DirectionsRun />}
            key={sprint._id}
            primaryText={sprint.name === currentSprintName ? <b>{sprint.name}</b> : sprint.name}
            onTouchTap={() => goToSprint(projectId, sprint._id)}
        />
    ));

    if (closedSprints.length) {
        listSprints.push(
            <ListItem
                primaryText="Closed sprints"
                key="closedSprints"
                leftIcon={<Lock />}
                nestedItems={
                    closedSprints.map(sprint => (
                        <ListItem
                            leftIcon={sprint.closed ? <Lock /> : <DirectionsRun />}
                            key={`nested${sprint._id}`}
                            primaryText={sprint.name === currentSprintName ?
                                <b>{sprint.name}</b>
                                :
                                sprint.name
                            }
                            onTouchTap={() => goToSprint(projectId, sprint._id)}
                        />
                    ))
                }
            />,
        );
    }

    if (showAddSprint) {
        listSprints.push(
            <ListItem
                leftIcon={<LibraryAdd />}
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
        currentSprintName,
        isSprintClosed,
        showAddSprint,
        showCreateLink,
        selectedProjectTitle,
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
                primaryText={selectedProjectTitle}
                nestedItems={
                renderProjectListItems(projects, goToProject, showCreateLink, goToAddProject)
                }
            />
            {currentSprintId && renderSprintLinks(
                projectId, currentSprintId, currentSprintName, isSprintClosed, sprintActions,
            )}
            <Divider />
            <Subheader>Sprints</Subheader>
            {renderSprintListItems(
                sprints, goToAddSprint, currentSprintName, goToSprint, projectId, showAddSprint,
            )}
        </List>
    );
};

SingleProjectSidebar.propTypes = {
    currentSprintId: PropTypes.string.isRequired,
    currentSprintName: PropTypes.string,
    projectId: PropTypes.string.isRequired,
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
    selectedProjectTitle: PropTypes.string,
    sprints: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            closed: PropTypes.bool.isRequired,
        }),
    ).isRequired,
    showAddSprint: PropTypes.bool.isRequired,
    showCreateLink: PropTypes.bool.isRequired,
    isSprintClosed: PropTypes.bool,
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
    currentSprintName: '',
    goToActionItems() {},
    goToAddProject() {},
    goToAddSprint() {},
    goToPosts() {},
    goToProject() {},
    goToSprint() {},
    goToWorkingAgreements() {},
    isSprintClosed: false,
    showAddSprint: false,
    selectedProjectTitle: 'Projects',
};

export default SingleProjectSidebar;
