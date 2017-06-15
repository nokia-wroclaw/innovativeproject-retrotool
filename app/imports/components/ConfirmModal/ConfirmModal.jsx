import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    FlatButton,
} from 'material-ui';

const ConfirmModal = ({ open, text, onCancel, onConfirm, ...props }) =>
    <Dialog
        modal
        open={open}
        actions={[
            <FlatButton
                label="Cancel"
                onTouchTap={onCancel}
            />,
            <FlatButton
                primary
                label="Confirm"
                onTouchTap={onConfirm}
            />,
        ]}
        {...props}
    >
        {text}
    </Dialog>
;

ConfirmModal.propTypes = {
    open: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default ConfirmModal;
