import React, { PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import { Meteor } from 'meteor/meteor';
import { List, ListItem, makeSelectable } from 'material-ui/List';


export default class UsersList extends React.Component {

    constructor(props) {
        super(props);
        this.SelectableList = makeSelectable(List);
        this.setAdmin = this.setAdmin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.users = props.users;
        this.state = { value: this.users.count() };
        this.user = this.users.fetch()[this.state.value - 1];
        this.items = [];
        for (let i = 1; i <= this.users.count(); i += 1) {
            this.items.push(
                <ListItem
                    value={1}
                    primaryText={this.users.fetch()[i - 1].services.github.username}
                    leftAvatar={<Avatar
                        src="http://www.clker.com/cliparts/3/V/U/m/W/U/admin-button-icon-md.png"
                    />}
                    nestedItems={[
                        <ListItem
                            value={2}
                            primaryText="Set admin"
                            leftAvatar={<i>xD</i>}
                            onClick={() => this.setAdmin(this.users.fetch()[i - 1])}
                        />,
                    ]}
                />,
                );
        }
    }


    setAdmin(x) {
        this.xD = 'xD';
        if (!x.isAdmin) {
            Meteor.call('setAdmin', x._id, Meteor.userId());
        } else {
            Meteor.call('remAdmin', x._id, Meteor.userId());
        }
    }

    handleChange(event, index, _value) {
        this.setState({ value: _value });
        this.state.value = _value;
        this.user = this.users.fetch()[this.state.value - 1];
    }

    render() {
        return (
            <div>
                <this.SelectableList defaultValue={3}>
                    <Subheader>Users</Subheader>
                    {this.items}
                </this.SelectableList>
            </div>
        );
    }
}

UsersList.propTypes = {
    users: PropTypes.arrayOf(Array).isRequired,
};
