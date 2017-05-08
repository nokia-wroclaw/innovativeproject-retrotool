import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { PropTypes } from 'prop-types';
import { actions } from '/imports/api/users/actions.js';

export default class SetAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            open: false,
        };
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose(choice) {
        if (choice) { actions.manageAdmin(this.props.user); }
        this.props.user.isAdmin = !this.props.user.isAdmin;

        this.setState({ open: false });
    }

    render() {
        const actiones = [
            <FlatButton
                label="No"
                keyboardFocused
                primary
                onTouchTap={() => this.handleClose(false)}
            />,
            <FlatButton
                label="Yes"
                primary
                onTouchTap={() => this.handleClose(true)}
            />,
        ];

        return (
            <div>
                <RaisedButton
                    label={this.props.user.isAdmin ? 'Remove admin' : 'Set admin'}
                    onTouchTap={this.handleOpen}
                />
                <Dialog
                    title="Are you sure to set admin?"
                    actions={actiones}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                />
            </div>
        );
    }
}
SetAdmin.propTypes = {
    user: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool.isRequired,
    })).isRequired,
};
