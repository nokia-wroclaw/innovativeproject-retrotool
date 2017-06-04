import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { PropTypes } from 'prop-types';
import { actions } from '/imports/api/users';

export default class SetAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            open: false,
            isAdmin: this.props.user.isAdmin,
        };
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose(choice) {
        if (choice) {
            actions.manageAdmin(this.props.user);
            this.setState({ isAdmin: !this.state.isAdmin });
        }
        this.setState({ open: false });
    }

    render() {
        const choice = [
            <FlatButton
                label="No"
                primary
                onTouchTap={() => this.handleClose(false)}
            />,
            <FlatButton
                label="Yes"
                secondary
                onTouchTap={() => this.handleClose(true)}
            />,
        ];

        return (
            <div>
                <RaisedButton
                    label={this.state.isAdmin ? 'Remove admin' : 'Set admin'}
                    onTouchTap={this.handleOpen}
                />
                <Dialog
                    title="Are you sure?"
                    actions={choice}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                />
            </div>
        );
    }
}
SetAdmin.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool.isRequired,
    }).isRequired,
};
