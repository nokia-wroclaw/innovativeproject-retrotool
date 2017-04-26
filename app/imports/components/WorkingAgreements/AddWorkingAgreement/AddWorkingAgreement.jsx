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
    DateField,
} from 'uniforms-material';

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
            <DateField
                name="date"
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