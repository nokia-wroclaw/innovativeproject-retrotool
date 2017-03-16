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

const SingleProjectSidebar = (props) => {
    const { projects, goToProject, projectId, goToAddSprint } = props;

    return (
        <List>
            <ListItem
                primaryText="Projects"
                nestedItems={getProjectListItems(projects, goToProject)}
            />
            <ListItem primaryText="Posts" />
            <ListItem
                primaryText="Sprints"

                nestedItems={[
                    <ListItem key="addSprint" primaryText="Add sprint" onTouchTap={() => goToAddSprint(projectId)} />]}
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
    goToProject: PropTypes.func.isRequired,
    projectId: PropTypes.string.isRequired,
    goToAddSprint: PropTypes.func.isRequired,
};

export default SingleProjectSidebar;
