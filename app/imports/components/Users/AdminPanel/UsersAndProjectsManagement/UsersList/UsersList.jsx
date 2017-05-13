import React from 'react';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import { PropTypes } from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import { actions } from '/imports/api/users/actions.js';
import SetAdmin from './setAdmin/SetAdmin.jsx';


export default class UsersList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: '',
        };

        this.filtr = this.filtr.bind(this);
    }

    filtr(user) {
        return user.profile.name.search(this.state.filter) >= 0;
    }

    render() {
        return (
            <div>
                Search: <AutoComplete
                    hintText="Type anything"
                    dataSource={actions.getUsersNames(this.props.users)}
                    menuProps={{ desktop: true, disableAutoFocus: true }}
                    onUpdateInput={inputText => this.setState({ filter: inputText })}
                />
                <List>
                    <Subheader>Users</Subheader>
                    {this.props.users.filter(this.filtr).map(user => (
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
                        ))}
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

