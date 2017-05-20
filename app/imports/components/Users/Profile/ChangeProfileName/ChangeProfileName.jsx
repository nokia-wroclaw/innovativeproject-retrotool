import React from 'react';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
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


const ChangeProfileName = ({
    error,
    onClose,
    onSubmit,
    open,
    oldName,
}) => {
    const schema = new SimpleSchema({
        text: {
            type: String,
            min: 3,
            max: 50,
            defaultValue: oldName,
        },
    });

    return (
        <Dialog
            title="Change name"
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
                    floatingLabelText="New profile name"
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

ChangeProfileName.defaultProps = {
    error: null,
    open: false,
};

ChangeProfileName.propTypes = {
    error: PropTypes.instanceOf(Error),
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    oldName: PropTypes.string.isRequired,
};

export default ChangeProfileName;
