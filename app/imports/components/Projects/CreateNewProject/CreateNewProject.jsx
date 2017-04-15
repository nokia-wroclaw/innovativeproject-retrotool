import React, { PropTypes } from 'react';
import {
    AutoForm,
    ErrorsField,
    TextField,
    SelectField,
    SubmitField,
} from 'uniforms-material';

import { schema } from './schema.js';

const CreateNewProject = ({
    options,
    onSubmit,
    error,
}) =>
    <AutoForm
        schema={schema}
        onSubmit={onSubmit}
        error={error}
    >
        <ErrorsField />
        <TextField
            name="name"
        />
        <SelectField
            name="moderators"
            options={options}
        />
        <SelectField
            name="members"
            options={options}
        />
        <SubmitField
            primary
        />
    </AutoForm>
;

CreateNewProject.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
    error: PropTypes.instanceOf(Error),
};

CreateNewProject.defaultProps = {
    error: null,
    options: [],
};

export default CreateNewProject;
