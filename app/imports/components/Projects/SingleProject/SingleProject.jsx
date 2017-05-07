import React from 'react';
import PropTypes from 'prop-types';

const SingleProject = ({ name }) => (
    <div className="content-container">
        <h1>{name}</h1>
    </div>
);

SingleProject.propTypes = {
    name: PropTypes.string.isRequired,
};

export default SingleProject;
