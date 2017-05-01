import React, { PropTypes } from 'react';
import connectField from 'uniforms/connectField';

import { DatePicker } from 'material-ui';


const CustomDatePicker = props => (
    <DatePicker
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        onChange={(a, date) => props.onChange(date)}
        hintText={props.placeholder}
        minDate={props.min}
        maxDate={props.max}
    />
);

CustomDatePicker.defaultProps = {
    disabled: false,
    id: '',
    name: '',
    placeholder: '',
    min: new Date(2000, 1, 1),
    max: new Date(2100, 1, 1),
};

CustomDatePicker.propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
};

export default connectField(CustomDatePicker, { ensureValue: false });
