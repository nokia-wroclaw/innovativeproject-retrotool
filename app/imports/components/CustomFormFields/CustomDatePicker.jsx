import React, { PropTypes } from 'react';
import connectField from 'uniforms/connectField';

import { DatePicker } from 'material-ui';


const CustomDatePicker = props => (
    <DatePicker
        name={props.name}
        onChange={(e, date) => props.onChange(date)}
        hintText={props.hintText}
        floatingLabelText={props.floatingLabelText}
        minDate={props.min}
        defaultDate={props.defaultDate}
    />
);

CustomDatePicker.defaultProps = {
    name: '',
    hintText: '',
    floatingLabelText: '',
    min: new Date(2000, 1, 1),
    defaultDate: {},
};

CustomDatePicker.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    hintText: PropTypes.string,
    min: PropTypes.instanceOf(Date),
    defaultDate: PropTypes.instanceOf(Date),
    floatingLabelText: PropTypes.string,
};

export default connectField(CustomDatePicker, { ensureValue: false });
