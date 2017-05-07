import React from 'react';
import PropTypes from 'prop-types';

const BasicLayout = ({ children }) => (
    <div
        style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            minWidth: '300px',
        }}
    >
        {children}
    </div>
);

BasicLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default BasicLayout;
