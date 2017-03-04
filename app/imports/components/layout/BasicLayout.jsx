import React, { PropTypes } from 'react';

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
