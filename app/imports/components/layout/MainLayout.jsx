import React, { PropTypes } from 'react';

const MainLayout = ({ children }) => (
    <div>
        {children}
    </div>
);

MainLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default MainLayout;
