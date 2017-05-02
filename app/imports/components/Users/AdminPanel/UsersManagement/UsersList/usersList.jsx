import React from 'react';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { PropTypes } from 'prop-types';
import SetAdmin from './setAdmin';


export default class UsersList extends React.Component {

    constructor(props) {
        super(props);
        this.SelectableList = makeSelectable(List);
        this.users = props.users;
    }


    render() {
        return (
            <div>
                <this.SelectableList defaultValue={3}>
                    <Subheader>Users</Subheader>
                    {this.users.map(user => (
                        <ListItem
                            value={1}
                            primaryText={user.services.github.username} // @@TODO change field
                            key={user._id}
                            leftAvatar={<Avatar
                                src="
                                http://www.clker.com/cliparts/3/V/U/m/W/U/admin-button-icon-md.png"
                            />}
                            nestedItems={[
                                <SetAdmin
                                    value={2}
                                    primaryText="Set admin"
                                    leftAvatar={<i>xD</i>}
                                    userId={user._id}
                                />,
                            ]}
                        />
        ))}
                </this.SelectableList>
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
