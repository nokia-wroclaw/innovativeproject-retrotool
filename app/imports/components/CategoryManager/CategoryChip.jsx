import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from 'material-ui';

export const CategoryChip = ({ value, label, onRequestDelete, backgroundColor, ...props }) =>
    <Chip
        onRequestDelete={() => onRequestDelete(value)}
        style={{ margin: '4px' }}
        backgroundColor={backgroundColor}
        {...props}
    >
        {label}
    </Chip>
;

CategoryChip.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    onRequestDelete: PropTypes.func.isRequired,
};

export default CategoryChip;
