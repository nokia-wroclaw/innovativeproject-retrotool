import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Meteor } from 'meteor/meteor';

export class SingleUserView extends React.Component {

    constructor(props) {
        console.log('SingleProjectView Constructor');
        super(props);
        this.setAdmin = this.setAdmin.bind(this);
        this.remAdmin = this.remAdmin.bind(this);
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
        };

        Meteor.subscribe('userData');
    }
    setAdmin() {
        Meteor.call('setAdmin', this.props.user._id,Meteor.userId());
    }

    remAdmin() {
        Meteor.call('remAdmin', this.props.user._id,Meteor.userId());
    }

    render() {
        return (<div><h1>Manage user: {this.props.user._id}</h1>
            <div>SET ADMIN: <RaisedButton
                onTouchTap={this.setAdmin}
                target="_blank"
                label="Set admin"
                secondary
                style={this.styles.button}
                icon={<FontIcon className="muidocs-icon-custom-github" />}
            /></div>
            <div>Remove ADMIN: <RaisedButton
                onTouchTap={this.remAdmin}
                target="_blank"
                label="Remove admin"
                secondary
                style={this.styles.button}
                icon={<FontIcon className="muidocs-icon-custom-github" />}
            /></div>
        </div>);
    }
}
