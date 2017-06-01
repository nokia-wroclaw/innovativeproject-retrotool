import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const SingleProject = ({ projectId, name, isFavouriteProject, starProject, unstarProject }) => (
    <div className="content-container">
        <h1>
            {isFavouriteProject ?
                <IconButton
                    onTouchTap={() => unstarProject(projectId)}
                >
                    <Star />
                </IconButton>
                :
                <IconButton
                    onTouchTap={() => starProject(projectId)}
                >
                    <StarBorder />
                </IconButton>
            }
            {name}
        </h1>
    </div>
);

SingleProject.propTypes = {
    projectId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isFavouriteProject: PropTypes.bool.isRequired,
    starProject: PropTypes.func.isRequired,
    unstarProject: PropTypes.func.isRequired,
};

SingleProject.defaultProps = {
    isFavouriteProject: false,
    starProject: () => {},
    unstarProject: () => {},
};

export default SingleProject;
