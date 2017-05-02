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
    sprintId,
    onData,
    handlers,
    wrappedData,
}) => (
    <Dialog
        title="Add action item"
        open={open}
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
            onTouchTap={() => onSubmit(id, sprintId, onData, handlers, wrappedData)}
            disabled={error}
            primary
        />
    </Dialog>
);

RemoveWorkingAgreement.propTypes = {
    error: PropTypes.instanceOf(Error),
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onData: PropTypes.func.isRequired,
    wrappedData: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    sprintId: PropTypes.string.isRequired,
    handlers: PropTypes.arrayOf(
        PropTypes.shape({
            subscriptionId: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
};

RemoveWorkingAgreement.defaultProps = {
    error: null,
    open: false,
};

export default RemoveWorkingAgreement;
