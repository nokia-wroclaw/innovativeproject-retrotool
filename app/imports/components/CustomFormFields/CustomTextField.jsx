import React, { PropTypes } from 'react';
import connectField from 'uniforms/connectField';

import { TextField } from 'material-ui';


const CustomTextField = props => (
    <TextField
        name={props.name}
        onChange={(e, value) => props.onChange(value)}
        hintText={props.placeholder}
        floatingLabelText={props.floatingLabelText}
        fullWidth={props.fullWidth}
        defaultValue={props.defaultValue}
    />
);

CustomTextField.defaultProps = {
    name: '',
    placeholder: '',
    floatingLabelText: '',
    defaultValue: '',
    fullWidth: false,
};

CustomTextField.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    floatingLabelText: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    fullWidth: PropTypes.bool,
};

export default connectField(CustomTextField, { ensureValue: false });
