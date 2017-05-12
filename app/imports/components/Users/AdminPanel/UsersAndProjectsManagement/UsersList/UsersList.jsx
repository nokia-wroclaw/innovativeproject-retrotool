import React from 'react';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import { PropTypes } from 'prop-types';
import SetAdmin from './setAdmin/SetAdmin.jsx';

export default class UsersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { filter: '' };
        this.func = this.func.bind(this);
        this.checker = this.checker.bind(this);
    }

    func(e) {
        this.setState({ filter: e.target.value });
    }

    checker(name) {
        if (name.search(this.state.filter) >= 0) { return true; } return false;
    }
    render() {
        return (
            <div>
                Find <input onChange={this.func} />
                <List>
                    <Subheader>Users</Subheader>
                    {this.props.users.map((user) => {
                        if (this.checker(user.profile.name)) {
                            return (
                                <ListItem
                                    primaryText={user.profile.name}
                                    key={user._id}
                                    leftAvatar={<Avatar
                                        src={user.profile.avatar}
                                    />}
                                    nestedItems={[
                                        <SetAdmin
                                            primaryText="Set admin"
                                            user={user}
                                            key={user._id}
                                        />,
                                    ]}
                                />
                            );
                        }
                        return undefined;
                    })}
                </List>
            </div>
        );
    }
}

UsersList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool.isRequired,
    })).isRequired,
};

