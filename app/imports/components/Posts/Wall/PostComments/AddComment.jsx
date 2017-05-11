import React from 'react';
import PropTypes from 'prop-types';
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

let formRef;
const AddComment = ({
    onSubmit,
    error,
}) => (
    <Card className="post-comment">
        <CardText>
            <AutoForm
                ref={(ref) => { formRef = ref; }}
                schema={schema}
                onSubmit={onSubmit}
                onSubmitSuccess={() => { formRef.reset(); }}
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
