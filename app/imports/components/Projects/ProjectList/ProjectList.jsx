import React from 'react';
import PropTypes from 'prop-types';
import {
    List,
    ListItem,
    IconButton,
} from 'material-ui';
import LibraryAdd from 'material-ui/svg-icons/av/library-add';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

export const renderProjectListItems = (
    projects,
    onTouchTap,
    showCreateLink = false,
    goToAddProject = () => {},
    favouriteProjects,
    starProject,
    unstarProject,
) => {
    const projectList = projects.map(({ _id, name }) => (
        <ListItem
            key={_id}
            primaryText={name}
            onTouchTap={() => onTouchTap(_id)}
            rightIconButton={favouriteProjects.indexOf(_id) !== -1 ?
                <IconButton
                    onTouchTap={() => unstarProject(_id)}
                >
                    <Star />
                </IconButton>
                :
                <IconButton
                    onTouchTap={() => starProject(_id)}
                >
                    <StarBorder />
                </IconButton>
                }
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
    favouriteProjects,
    starProject,
    unstarProject,
}) => (
    <List>
        {renderProjectListItems(
            projects,
            onTouchTap,
            showCreateLink,
            goToAddProject,
            favouriteProjects,
            starProject,
            unstarProject,
        )}
    </List>
);

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
    favouriteProjects: PropTypes.arrayOf(
        PropTypes.string.isRequired,
    ).isRequired,
    starProject: PropTypes.func.isRequired,
    unstarProject: PropTypes.func.isRequired,
    onTouchTap: PropTypes.func.isRequired,
    goToAddProject: PropTypes.func.isRequired,
    showCreateLink: PropTypes.bool.isRequired,
};

ProjectList.defaultProps = {
    showCreateLink: false,
};

export default ProjectList;
