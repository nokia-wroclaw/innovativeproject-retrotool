import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    FlatButton,
} from 'material-ui';

import {
    AutoForm,
    ErrorsField,
    SubmitField,
} from 'uniforms-material';

import { CustomTextField } from '/imports/components/CustomFormFields';

import { schema } from './schema.js';

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
                    <CustomTextField
                        name="closeMessage"
                        floatingLabelText="Close message - optional"
                        fullWidth
                        value={closeMessage}
                        defaultValue={closeMessage}
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
