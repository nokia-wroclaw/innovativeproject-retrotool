import React from 'react';
import PropTypes from 'prop-types';
import {
    SelectField,
    MenuItem,
} from 'material-ui';

const RenderStatus = ({
    selectedState,
    onChangeCategory,
    status,
}) => (
    <SelectField
        value={selectedState}
        onChange={onChangeCategory}
        floatingLabelText="Status"
        floatingLabelFixed
        hintText="Select filter"
    >
        {status.map(state =>
            <MenuItem
                key={state.value}
                value={state.value}
                primaryText={state.label}
            />,
        )}
    </SelectField>
);

RenderStatus.propTypes = {
    selectedState: PropTypes.string.isRequired,
    status: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
    onChangeCategory: PropTypes.func.isRequired,
};

export default RenderStatus;
