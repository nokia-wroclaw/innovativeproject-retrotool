import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardActions,
    CardMedia,
    CardTitle,
    FlatButton,
} from 'material-ui';


const Profile = ({ user }) =>
    <div className="content-container">
        <Card className="profileContainer">
            <CardMedia>
                <img src={user.profile.avatar} alt="My avatar" />
            </CardMedia>
            <CardTitle title={user.profile.name} subtitle={user.isAdmin ? 'Admin' : ''} />
            <CardActions>
                <FlatButton label="Change name" />
                <FlatButton label="Connect photo with github" />
                <FlatButton label="Connect photo with gravatar" />
            </CardActions>
        </Card>
    </div>
;

Profile.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool.isRequired,
        profile: PropTypes.shape({
            avatar: PropTypes.string,
            name: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

export default Profile;
