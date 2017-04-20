import React, { PropTypes } from 'react';
import {
    Card,
    CardText,
} from 'material-ui';
import {
    AutoForm,
    ErrorsField,
    TextField,
    BoolField,
    SubmitField,
} from 'uniforms-material';
import { schema } from './schema.js';

const AddComment = ({
    onSubmit,
    error,
}) => (
    <Card>
        <CardText>
            <AutoForm
                schema={schema}
                onSubmit={onSubmit}
                error={error}
            >
                <ErrorsField />
                <TextField
                    name="text"
                    label="Would you add something?"
                    fullWidth
                    multiLine
                />
                <BoolField
                    name="showAuthor"
                    label="Show my name"
                />
                <SubmitField
                    label="Post comment"
                    primary
                />
            </AutoForm>
        </CardText>
    </Card>
);

AddComment.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.instanceOf(Error),
};

AddComment.defaultProps = {
    error: null,
};

export default AddComment;
