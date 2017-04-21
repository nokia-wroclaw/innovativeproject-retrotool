import React from 'react';
import PropTypes from 'prop-types';

const BasicLayout = ({ children }) => (
    <div>
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
