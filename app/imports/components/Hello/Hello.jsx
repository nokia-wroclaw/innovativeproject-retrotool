import React from 'react';
import PropTypes from 'prop-types';
import { Subheader } from 'material-ui';
import { List, ListItem } from 'material-ui/List';

const ProjectsListing = ({ projects, goToProject }) =>
    <div>
        <Subheader>Favourite Projects</Subheader>
        <List>
            {projects.map(project => (
                <ListItem
                    key={project.id}
                    primaryText={project.name}
                    onTouchTap={() => goToProject(project.id)}
                />
            ))}
        </List>
    </div>
;

ProjectsListing.propTypes = {
    projects: PropTypes.arrayOf({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    goToProject: PropTypes.func.isRequired,
};


const Hello = ({ projects, goToProject }) => (
    <div className="content-container">
        <h2>Hello!</h2>

        {projects.length ?
            <ProjectsListing
                projects={projects}
                goToProject={goToProject}
            />
            :
            <h4>You do not have favourite projects, star them!</h4>
        }
    </div>
);

Hello.propTypes = {
    projects: PropTypes.arrayOf({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    goToProject: PropTypes.func.isRequired,
};

Hello.defaultProps = {
    projects: [],
    goToProject() {},
};

export default Hello;
