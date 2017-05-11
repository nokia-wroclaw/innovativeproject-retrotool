import React from 'react';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import { PropTypes } from 'prop-types';
import SetAdmin from './setAdmin/setAdmin.jsx';


const UsersList = props => (
    <div>
        <List>
            <Subheader>Users</Subheader>
            {props.users.map(user => (
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
                        />,
                    ]}
                />
        ))}
        </List>
    </div>
        );

UsersList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool.isRequired,
    })).isRequired,
};

export default UsersList;
