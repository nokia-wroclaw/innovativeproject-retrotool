import React, { PropTypes } from 'react';

const SingleSprint = ({ name }) => (
    <div>
        <h1>{name} sprint</h1>
    </div>
);

SingleSprint.propTypes = {
    name: PropTypes.string.isRequired,
};

export default SingleSprint;
