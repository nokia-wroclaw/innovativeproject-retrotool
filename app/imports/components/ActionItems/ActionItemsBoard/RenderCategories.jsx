import React from 'react';
import PropTypes from 'prop-types';
import {
    SelectField,
    MenuItem,
} from 'material-ui';

const RenderCategories = ({
    selectedState,
    onChangeCategory,
    categories,
}) => (
    <SelectField
        value={selectedState}
        onChange={onChangeCategory}
        floatingLabelText="State"
        floatingLabelFixed
        hintText="Select filter"
    >
        {categories.map(category =>
            <MenuItem
                key={category.value}
                value={category.value}
                primaryText={category.label}
            />,
        )}
    </SelectField>
);

RenderCategories.propTypes = {
    selectedState: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
    onChangeCategory: PropTypes.func.isRequired,
};

export default RenderCategories;
