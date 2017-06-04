import React from 'react';
import PropTypes from 'prop-types';
import { Subheader, Paper } from 'material-ui';
import { styles } from './styles.js';

const ProjectsListing = ({ projects, goToProject }) =>
    <div>
        <Subheader>Favourite Projects</Subheader>

        <div className="tiles-container">
            {projects.map(project => (
                <Paper
                    key={`paper${project.id}`}
                    style={styles.paper}
                    zDepth={3}
                    onTouchTap={() => goToProject(project.id)}
                >
                    {project.name}
                </Paper>
            ))}
        </div>
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
