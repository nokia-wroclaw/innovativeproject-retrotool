import React from 'react';
import PropTypes from 'prop-types';
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

import { schema } from './schema.js';

const CloseOrReopenActionItem = ({
    error,
    onClose,
    onSubmit,
    open,
    isOpen,
}) => {
    const dialogMessage = isOpen ?
       'Are you sure you want to close this action item?'
       :
       'Are you sure you want to reopen this action item?'
    ;

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
};

CloseOrReopenActionItem.defaultProps = {
    error: null,
    open: false,
};

export default CloseOrReopenActionItem;
