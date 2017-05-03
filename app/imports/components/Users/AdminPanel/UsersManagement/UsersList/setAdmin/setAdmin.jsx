import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { PropTypes } from 'prop-types';
import { actions } from './actions.js';


export default class SetAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.users = props.users;
        this.userId = props.userId;
        this.index = actions.getIndexOfUserById(this.users, this.userId);
        this.newAdmin = this.users[this.index];
        this.isAdmin = this.newAdmin.isAdmin;
        this.state = {
            open: false,
        };
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose(label) {
        if (label) { actions.setAdmin(this.newAdmin); }
        this.newAdmin.isAdmin = !this.newAdmin.isAdmin;

        this.setState({ open: false });
    }

    render() {
        const actiones = [
            <FlatButton
                label="NO!"
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
                    label={this.newAdmin.isAdmin ? 'Remove admin' : 'Set admin'}
                    onTouchTap={this.handleOpen}
                />
                <Dialog
                    title="Are you sure to set admin?"
                    actions={actiones}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
            </div>
        );
    }
}
SetAdmin.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool.isRequired,
    })).isRequired,
    userId: PropTypes.string.isRequired,
};
