import { Meteor } from 'meteor/meteor';
import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { SingleUserView } from './SingleUserView/singleUserView.jsx';


export class UsersList extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.users = Meteor.users.find({});
        this.state = { value: this.users.count() };
        this.user = this.users.fetch()[this.state.value - 1];
        this.items = [];
        for (let i = 1; i <= this.users.count(); i += 1) {
            this.items.push(
                <MenuItem
                    value={i}
                    key={i}
                    primaryText={this.users.fetch()[i - 1].services.github.username}
                />,
                );
        }
    }

    handleChange(event, index, _value) {
        console.log('ListOfUsers handleChange', 'index = ', index, 'value = ', _value);
        this.setState({ value: _value });
        this.state.value = _value;
        this.user = this.users.fetch()[this.state.value - 1];
    }

    render() {
        return (
            <div>
                <DropDownMenu maxHeight={300} value={this.state.value} onChange={this.handleChange}>
                    {this.items}
                </DropDownMenu>
                <SingleUserView user={this.user} />
            </div>
        );
    }
}
