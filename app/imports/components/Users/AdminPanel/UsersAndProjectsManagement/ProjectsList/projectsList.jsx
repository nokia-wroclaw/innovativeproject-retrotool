import React from 'react';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import { PropTypes } from 'prop-types';

const ProjectsList = props => (
    <div>
        <List>
            <Subheader>Projects</Subheader>
            {props.projects.map(project => (
                <ListItem
                    primaryText={project.name}
                    key={project._id}
                />
        ))}
        </List>
    </div>
        );

ProjectsList.propTypes = {
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default ProjectsList;
