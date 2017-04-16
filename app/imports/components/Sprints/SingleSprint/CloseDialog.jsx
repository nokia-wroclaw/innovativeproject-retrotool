import React, { PropTypes } from 'react';
import {
    FlatButton,
    Dialog,
} from 'material-ui';


export default class CloseDialog extends React.Component {
    onSubmit(e, sprintId) {
        e.preventDefault();

        const {
        toggleSprint,
        onClose,
        } = this.props;

        toggleSprint(sprintId);
        onClose();
    }

    render() {
        const {
            sprint,
            open,
            onClose,
        } = this.props;

        const actions = [
            <FlatButton
                label="Cancel"
                primary
                onTouchTap={onClose}
            />,
            <FlatButton
                label={!sprint.closed ? 'Close sprint' : 'Open sprint'}
                primary
                onTouchTap={e => this.onSubmit(e, sprint._id)}
            />,
        ];

        return (
            <div>
                <Dialog
                    title={!sprint.closed ? 'Are you sure you want to close this sprint?' :
                    'Are you sure you want to open this sprint?'}
                    actions={actions}
                    open={open}
                />
            </div>
        );
    }
}

CloseDialog.defaultPropTypes = {
    open: false,
};

CloseDialog.propTypes = {
    sprint: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    open: PropTypes.bool.isRequired,
    toggleSprint: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
