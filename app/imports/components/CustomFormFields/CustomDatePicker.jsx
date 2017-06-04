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
        maxDate={props.maxDate}
        defaultDate={props.defaultDate}
        autoOk={props.autoOk}
        className={props.className}
        container={props.container}
        disableYearSelection={props.disableYearSelection}
        disabled={props.disabled}
        firstDayOfWeek={props.firstDayOfWeek}
        hideCalendarDate={props.hideCalendarDate}
        mode={props.mode}
    />
);

CustomDatePicker.defaultProps = {
    name: '',
    hintText: '',
    floatingLabelText: '',
    className: '',
    container: 'dialog',
    mode: 'portrait',
    min: new Date(2000, 1, 1),
    maxDate: new Date(2100, 1, 1),
    defaultDate: new Date(),
    autoOk: false,
    disableYearSelection: false,
    disabled: false,
    hideCalendarDate: false,
    firstDayOfWeek: 1,
};

CustomDatePicker.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    hintText: PropTypes.string,
    min: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    defaultDate: PropTypes.instanceOf(Date),
    floatingLabelText: PropTypes.string,
    className: PropTypes.string,
    container: PropTypes.string,
    mode: PropTypes.string,
    autoOk: PropTypes.bool,
    disableYearSelection: PropTypes.bool,
    disabled: PropTypes.bool,
    hideCalendarDate: PropTypes.bool,
    firstDayOfWeek: PropTypes.number,
};

export default connectField(CustomDatePicker, { ensureValue: false });
