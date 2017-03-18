import React, { PropTypes } from 'react';
import {
    List,
    ListItem,
} from 'material-ui';

const ProjectList = ({
    projects,
    onTouchTap,
}) => (
    <List>
        {projects.map(({ _id, name }) => (
            <ListItem
                key={_id}
                primaryText={name}
                onTouchTap={() => onTouchTap(_id)}
            />
        ))}
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
};

export default ProjectList;
