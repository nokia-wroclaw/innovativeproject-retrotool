import React from 'react';
import PropTypes from 'prop-types';
import {
    AutoForm,
    ErrorsField,
    TextField,
    SubmitField,
} from 'uniforms-material';

import { UserSelectField } from '/imports/components/CustomFormFields';

import { schema } from './schema.js';

const CreateNewProject = ({
    options,
    onSubmit,
    error,
}) =>
    <AutoForm
        className="content-container half"
        schema={schema}
        onSubmit={onSubmit}
        error={error}
    >
        <h1>Create new project</h1>
        <ErrorsField />
        <TextField
            name="name"
        />
        <UserSelectField
            name="moderators"
            floatingLabelText="Moderators"
            options={options}
        />
        <UserSelectField
            name="members"
            floatingLabelText="Members"
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
