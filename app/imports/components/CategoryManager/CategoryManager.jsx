import React from 'react';
import PropTypes from 'prop-types';

class CategoriesManager extends React.Component {


    render() {
        return (
            <div>
                Project Manager...
            </div>
        );
    }
}

const categoryPropTypes = PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
}).isRequired;

CategoriesManager.propTypes = {
    globalCategories: PropTypes.arrayOf(categoryPropTypes).isRequired,
    projectCategories: PropTypes.arrayOf(categoryPropTypes).isRequired,
};

CategoriesManager.defaultProps = {
    globalCategories: [],
    projectCategories: [],
};

export default CategoriesManager;
