import React, { PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';
import { Meteor } from 'meteor/meteor';

export class SingleUserView extends React.Component {

    constructor(props) {
        super(props);
        this.setAdmin = this.setAdmin.bind(this);
        this.AddNewAdmin = false;
        this.AddNewModerator = false;
        this.styles = {
            button: {
                margin: 12,
            },
            exampleImageInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0,
            },
            block: {
                maxWidth: 250,
            },
            toggle: {
                marginBottom: 16,
            },
            thumbOff: {
                backgroundColor: '#ffcccc',
            },
            trackOff: {
                backgroundColor: '#ff9d9d',
            },
            thumbSwitched: {
                backgroundColor: 'red',
            },
            trackSwitched: {
                backgroundColor: '#ff9d9d',
            },
            labelStyle: {
                color: 'red',
            },

        };

        Meteor.subscribe('userData');
    }
    setAdmin() {
        if (!this.props.user.isAdmin) {
            Meteor.call('setAdmin', this.props.user._id, Meteor.userId());
            this.props.user.isAdmin = true;
        } else {
            Meteor.call('remAdmin', this.props.user._id, Meteor.userId());
            this.props.user.isAdmin = false;
        }
    }
    render() {
        return (<div>
            <h1>User name: {this.props.user.services.github.username}</h1>
            <h1>User email: {this.props.user.services.github.email}</h1>
            <h1>User id: {this.props.user._id}</h1>
            <div>SET ADMIN:
                <Toggle
                    label="Label on the right"
                    labelPosition="left"
                    style={this.styles.toggle}
                    onToggle={this.setAdmin}
                    defaultToggled={this.props.user.isAdmin}
                />
            </div>
        </div>);
    }
}

SingleUserView.propTypes = {
    user: PropTypes.element.isRequired,
};
