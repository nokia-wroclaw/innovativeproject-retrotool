import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    RaisedButton,
    CardText,
} from 'material-ui';

const RemoveWorkingAgreement = ({
    error,
    onClose,
    onSubmit,
    open,
    id,
}) => (
    <Dialog
        title="Are you sure you want to remove this working agreement?"
        open={open}
        onRequestClose={onClose}
    >
        {error ?
            <CardText color="red">
                {error.reason ? error.reason : error.toString()}
            </CardText>
            :
            ''
        }
        <RaisedButton
            label="Close"
            onTouchTap={onClose}
        />
        <RaisedButton
            label="Remove"
            onTouchTap={() => onSubmit(id)}
            disabled={!!error}
            primary
        />
    </Dialog>
);

RemoveWorkingAgreement.propTypes = {
    error: PropTypes.instanceOf(Error),
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
};

RemoveWorkingAgreement.defaultProps = {
    error: null,
    open: false,
};

export default RemoveWorkingAgreement;
