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
    SubmitField,
    TextField,
} from 'uniforms-material';

const CloseOrReopenActionItem = ({
    error,
    onClose,
    onSubmit,
    open,
    isOpen,
    closeMessage,
}) => {
    const dialogMessage = isOpen ?
       'Are you sure you want to close this action item?'
       :
       'Are you sure you want to reopen this action item?'
    ;

    const schema = new SimpleSchema({
        closeMessage: {
            type: String,
            max: 250,
            defaultValue: closeMessage,
        },
    });

    return (
        <Dialog
            title={dialogMessage}
            open={open}
        >
            <AutoForm
                schema={schema}
                onSubmit={onSubmit}
                error={error}
            >
                <ErrorsField />
                { isOpen ?
                    <TextField
                        name="closeMessage"
                        floatingLabelText="Close message - optional"
                        fullWidth
                    />
                    :
                    ''
                }
                <FlatButton
                    label="Close"
                    onTouchTap={onClose}
                />
                <SubmitField
                    label={isOpen ? 'Close action item' : 'Reopen action item'}
                    primary
                />
            </AutoForm>
        </Dialog>
    );
};

CloseOrReopenActionItem.propTypes = {
    error: PropTypes.instanceOf(Error),
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    closeMessage: PropTypes.string,
};

CloseOrReopenActionItem.defaultProps = {
    error: null,
    open: false,
    closeMessage: '',
};

export default CloseOrReopenActionItem;
