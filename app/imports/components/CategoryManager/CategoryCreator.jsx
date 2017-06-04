import React from 'react';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import {
    AutoForm,
    TextField,
} from 'uniforms-material';
import {
    FlatButton,
} from 'material-ui';

let formRef;
export const CategoryCreator = ({ projectId, onAdd }) =>
    <AutoForm
        ref={(ref) => { formRef = ref; }}
        onSubmit={doc => onAdd({ projectId, ...doc })}
        onSubmitSuccess={() => { formRef.reset(); }}
        schema={new SimpleSchema({
            name: String,
        })}
    >
        <TextField
            name="name"
            floatingLabelText="Category name"
            fullWidth={false}
        />
        <FlatButton
            label="Add category"
            onTouchTap={() => formRef.submit()}
        />
    </AutoForm>
;

CategoryCreator.propTypes = {
    projectId: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default CategoryCreator;
