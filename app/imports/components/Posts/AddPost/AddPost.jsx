import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    FlatButton,
} from 'material-ui';
import {
    AutoForm,
    BoolField,
    ErrorField,
    TextField,
    SelectField,
    SubmitField,
} from 'uniforms-material';
import { schema } from './schema.js';

const AddPost = ({
    categories,
    error,
    onClose,
    onSubmit,
    open,
}) => (
    <Dialog
        title="Add post"
        open={open}
    >
        <AutoForm
            schema={schema}
            onSubmit={onSubmit}
            error={error}
        >
            <ErrorField
                name="text"
            />
            <TextField
                name="text"
                floatingLabelText="What would you say?"
                multiLine
                rows={4}
                fullWidth
            />
            <SelectField
                name="categoryId"
                floatingLabelText="Category"
                floatingLabelFixed
                hintText="Select category"
                options={categories}
            />
            <BoolField
                name="showAuthor"
                label="Show my name"
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


AddPost.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
    error: PropTypes.instanceOf(Error),
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

AddPost.defaultProps = {
    categories: [],
    error: null,
    open: false,
};

export default AddPost;
