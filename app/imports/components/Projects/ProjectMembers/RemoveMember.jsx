import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    FlatButton,
} from 'material-ui';

const RemoveMember = ({
    open,
    name,
    onConfirm,
    onCancel,
}) =>
    <Dialog
        actions={[
            <FlatButton
                onTouchTap={onCancel}
                label="Cancel"
            />,
            <FlatButton
                primary
                onTouchTap={onConfirm}
                label="Confirm"
            />,
        ]}
        title="Confirm: remove member"
        open={open}
        modal
    >
        Do you want to remove {name}?
    </Dialog>
;

RemoveMember.propTypes = {
    open: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

RemoveMember.defaultProps = {
    open: false,
    onConfirm() {},
    onCancel() {},
};

export default RemoveMember;
