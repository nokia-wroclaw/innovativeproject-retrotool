import React, { PropTypes } from 'react';

const SingleProject = ({ name }) => (
    <div>
        <h1>{name}</h1>
    </div>
);

SingleProject.propTypes = {
    name: PropTypes.string.isRequired,
};

export default SingleProject;
