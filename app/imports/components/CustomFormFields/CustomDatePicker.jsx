import React, { PropTypes } from 'react';
import connectField from 'uniforms/connectField';

import { DatePicker } from 'material-ui';


const CustomDatePicker = props => (
    <DatePicker
        name={props.name}
        onChange={(e, date) => props.onChange(date)}
        hintText={props.placeholder}
        minDate={props.min}
    />
);

CustomDatePicker.defaultProps = {
    name: '',
    placeholder: '',
    min: new Date(2000, 1, 1),
};

CustomDatePicker.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    min: PropTypes.instanceOf(Date),
};

export default connectField(CustomDatePicker, { ensureValue: false });
