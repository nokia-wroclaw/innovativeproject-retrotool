import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from 'material-ui';

export const CategoryChip = ({ value, label, onRequestDelete }) =>
    <Chip
        onRequestDelete={() => onRequestDelete(value)}
        style={{ margin: '4px' }}
    >
        {label}
    </Chip>
;

CategoryChip.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onRequestDelete: PropTypes.func.isRequired,
};

export default CategoryChip;
