import React, { PropTypes } from 'react';
import {
    FlatButton,
    Dialog,
    CardText,
} from 'material-ui';


export default class CloseDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: '',
        };
    }

    onSubmit(e, sprintId) {
        e.preventDefault();

        const {
            toggleSprint,
            onClose,
        } = this.props;


        toggleSprint(sprintId, (err) => {
            if (err) {
                this.setState({
                    errorMessage: err.reason,
                });
            } else {
                onClose();
            }
        });
    }

    render() {
        const {
            sprint,
            open,
            onClose,
        } = this.props;

        const { errorMessage } = this.state;

        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={onClose}
            />,
            <FlatButton
                label={!sprint.closed ? 'Close sprint' : 'Open sprint'}
                primary
                onTouchTap={e => this.onSubmit(e, sprint._id)}
            />,
        ];

        const title = sprint.closed ?
           'Are you sure you want to open this sprint?'
           :
           'Are you sure you want to close this sprint?'
        ;

        return (
            <div>
                <Dialog
                    title={title}
                    actions={actions}
                    open={open}
                >
                    {errorMessage ?
                        <CardText
                            color="red"
                        >
                            {errorMessage}
                        </CardText>
                        :
                        ''
                    }
                </Dialog>
            </div>
        );
    }
}

CloseDialog.defaultProps = {
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
