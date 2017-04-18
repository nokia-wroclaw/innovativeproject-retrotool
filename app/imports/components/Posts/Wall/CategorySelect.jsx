import React, { PropTypes } from 'react';
import {
    SelectField,
    MenuItem,
} from 'material-ui';

const CategorySelect = ({
    selectedCategoryId,
    handleChangeSelectedCategory,
    categories,
}) => (
    <SelectField
        value={selectedCategoryId}
        onChange={handleChangeSelectedCategory}
        floatingLabelText="Category"
        floatingLabelFixed
        hintText="Select category"
    >
        {categories.map(category =>
            <MenuItem
                key={category.value}
                value={category.value}
                primaryText={category.label}
            />,
        )}
        {selectedCategoryId ?
            <MenuItem
                onTouchTap={(...args) => handleChangeSelectedCategory(...args)}
                primaryText="Reset filter"
            />
            :
            ''
        }
    </SelectField>
);

CategorySelect.propTypes = {
    selectedCategoryId: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
    handleChangeSelectedCategory: PropTypes.func.isRequired,
};

export default CategorySelect;
