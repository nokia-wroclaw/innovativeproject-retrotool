import React, { PropTypes } from 'react';
import {
    List,
    ListItem,
} from 'material-ui';

const ProjectsList = ({
    projects,
    onTouchTap,
    goToAddProject,
}) => (
    <List>
        {projects.map(({ _id, name }) => (
            <ListItem
                key={_id}
                primaryText={name}
                onTouchTap={() => onTouchTap(_id)}
            />
        ))}
        <ListItem
            key="createProject"
            primaryText="Create a new project"
            onTouchTap={() => goToAddProject()}
        />
    </List>
);

ProjectsList.propTypes = {
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
    onTouchTap: PropTypes.func.isRequired,
    goToAddProject: PropTypes.func.isRequired,
};

export default ProjectsList;
