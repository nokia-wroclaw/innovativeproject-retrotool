import React from 'react';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import {
    AutoForm,
    TextField,
    ErrorsField,
    SubmitField,
} from 'uniforms-material';

const schema = new SimpleSchema({
    name: {
        type: String,
        min: 3,
    },
});

const AddSprint = ({
    onSubmit,
    error,
}) => (
    <AutoForm
        schema={schema}
        onSubmit={onSubmit}
        error={error}
    >
        <ErrorsField />
        <TextField
            name="name"
            label="Sprint name"
        />
        <SubmitField
            label="Add"
            primary
        />
    </AutoForm>
);

AddSprint.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.instanceOf(Error),
};

AddSprint.defaultProps = {
    error: null,
};

export default AddSprint;
