import React from 'react';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { PropTypes } from 'prop-types';
import DialogExampleSimple from './setAdmin.jsx';
import { actions } from './actions.js';


export default class UsersList extends React.Component {

    constructor(props) {
        super(props);
        this.SelectableList = makeSelectable(List);
        this.handleChange = this.handleChange.bind(this);
        this.users = props.users;
        this.callMethod = props.callMethod;
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
                            onClick={() => actions.setAdmin(this.users.fetch()[i - 1])}
                        />,
                    ]}
                />,
                );
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
    callMethod: PropTypes.func.isRequired,
};
