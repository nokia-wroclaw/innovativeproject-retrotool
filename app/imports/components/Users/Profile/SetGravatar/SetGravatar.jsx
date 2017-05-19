import React from 'react';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import {
    Dialog,
    FlatButton,
} from 'material-ui';

import {
    AutoForm,
    SubmitField,
    TextField,
} from 'uniforms-material';

const SetGravatar = ({
    onClose,
    onSubmit,
    open,
    email,
}) => {
    const schema = new SimpleSchema({
        address: {
            type: String,
            defaultValue: email,
            regEx: SimpleSchema.RegEx.Email,
        },
    });

    return (
        <Dialog
            title="Type your gravatar email address"
            open={open}
            onRequestClose={onClose}
        >
            <AutoForm
                schema={schema}
                onSubmit={onSubmit}
            >
                <TextField
                    name="address"
                    floatingLabelText="Gravatar email address"
                    fullWidth
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
};

SetGravatar.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
};

SetGravatar.defaultProps = {
    open: false,
};

export default SetGravatar;
