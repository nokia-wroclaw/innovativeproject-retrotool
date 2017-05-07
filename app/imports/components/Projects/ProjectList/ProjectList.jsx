import React from 'react';
import PropTypes from 'prop-types';
import {
    List,
    ListItem,
} from 'material-ui';
import LibraryAdd from 'material-ui/svg-icons/av/library-add';

export const renderProjectListItems = (
    projects,
    onTouchTap,
    showCreateLink = false,
    goToAddProject = () => {},
) => {
    const projectList = projects.map(({ _id, name }) => (
        <ListItem
            key={_id}
            primaryText={name}
            onTouchTap={() => onTouchTap(_id)}
        />
    ));

    if (showCreateLink) {
        projectList.push(
            <ListItem
                key="createProject"
                leftIcon={<LibraryAdd />}
                primaryText="Create project"
                onTouchTap={goToAddProject}
            />,
        );
    }

    return projectList;
};

const ProjectList = ({
    projects,
    onTouchTap,
    goToAddProject,
    showCreateLink,
}) => (
    <List>
        {renderProjectListItems(projects, onTouchTap, showCreateLink, goToAddProject)}
    </List>
);

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
    onTouchTap: PropTypes.func.isRequired,
    goToAddProject: PropTypes.func.isRequired,
    showCreateLink: PropTypes.bool.isRequired,
};

ProjectList.defaultProps = {
    showCreateLink: false,
};

export default ProjectList;
