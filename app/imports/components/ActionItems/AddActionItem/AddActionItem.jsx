import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    FlatButton,
} from 'material-ui';

import {
    AutoForm,
    ErrorsField,
    TextField,
    SubmitField,
    SelectField,
} from 'uniforms-material';

import { CustomDatePicker } from '/imports/components/CustomFormFields';

import { schema } from './schema.js';

const AddActionItem = ({
    error,
    onClose,
    onSubmit,
    open,
    options,
}) => (
    <Dialog
        title="Add action item"
        open={open}
    >
        <AutoForm
            schema={schema}
            onSubmit={onSubmit}
            error={error}
        >
            <ErrorsField />
            <TextField
                name="text"
                floatingLabelText="Action item"
                fullWidth
            />
            <SelectField
                name="assignee"
                checkboxes={false}
                options={options}
            />
            <CustomDatePicker
                name="startDate"
                min={new Date()}
                placeholder="Start date"
            />
            <CustomDatePicker
                name="endDate"
                min={new Date()}
                placeholder="End date"
            />
            <FlatButton
                label="Close"
                onTouchTap={onClose}
            />
            <SubmitField
                primary
            />
        </AutoForm>
    </Dialog>
);


AddActionItem.propTypes = {
    error: PropTypes.instanceOf(Error),
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

AddActionItem.defaultProps = {
    error: null,
    open: false,
    options: [],
};

export default AddActionItem;
