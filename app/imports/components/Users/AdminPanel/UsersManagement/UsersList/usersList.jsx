import React from 'react';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { PropTypes } from 'prop-types';
import SetAdmin from './setAdmin';


export default class UsersList extends React.Component {

    constructor(props) {
        super(props);
        this.SelectableList = makeSelectable(List); // @TODO Do it like in tutorial
    }


    render() {
        return (
            <div>
                <this.SelectableList>
                    <Subheader>Users</Subheader>
                    {this.props.users.map(user => (
                        <ListItem
                            value={1}
                            primaryText={user.profile.name}
                            key={user._id}
                            leftAvatar={<Avatar
                                src={user.profile.avatar}
                            />}
                            nestedItems={[
                                <SetAdmin
                                    value={2}
                                    primaryText="Set admin"
                                    user={user}
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
