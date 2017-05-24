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
} from 'uniforms-material';

import { CustomDatePicker } from '/imports/components/CustomFormFields';

import { schema } from './schema.js';

const AddWorkingAgreement = ({
    error,
    onClose,
    onSubmit,
    open,
}) => (
    <Dialog
        title="Add working agreement"
        open={open}
        onRequestClose={onClose}
    >
        <AutoForm
            schema={schema}
            onSubmit={onSubmit}
            error={error}
        >
            <ErrorsField />
            <TextField
                name="text"
                floatingLabelText="Working agreement"
                fullWidth
            />
            <CustomDatePicker
                name="date"
                min={new Date()}
                floatingLabelText="Start date"
                defaultDate={new Date()}
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


AddWorkingAgreement.propTypes = {
    error: PropTypes.instanceOf(Error),
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

AddWorkingAgreement.defaultProps = {
    error: null,
    open: false,
};

export default AddWorkingAgreement;
