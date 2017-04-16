import React, { PropTypes } from 'react';
import {
    MenuItem,
    SelectField,
} from 'material-ui';

const SortSelect = ({
    selectedId,
    onChange,
    options,
}) => (
    <SelectField
        onChange={onChange}
        floatingLabelText="Sort By"
        floatingLabelFixed
        value={selectedId}
    >
        {options.map(option =>
            <MenuItem
                key={option.value}
                value={option.value}
                primaryText={option.label}
            />,
        )}
    </SelectField>
);

SortSelect.propTypes = {
    selectedId: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        }),
    ).isRequired,
    onChange: PropTypes.func.isRequired,
};

SortSelect.defaultProps = {
    selectedId: '',
    options: [],
    onChange() {},
};

export default SortSelect;
