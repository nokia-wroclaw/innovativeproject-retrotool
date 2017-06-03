import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardActions,
    CardMedia,
    CardTitle,
    FlatButton,
} from 'material-ui';


const isGithubAvatar = avatar => avatar.startsWith('https://github.com');
const isGithubUser = user => user.services.github;

const UserCard = ({
    showChangeProfileNameModal,
    setProfileAvatar,
    setGravatar,
    user,
}) =>
    <Card className="profile-container">
        <CardMedia>
            <img src={user.profile.avatar} alt="My avatar" />
        </CardMedia>
        <CardTitle title={user.profile.name} subtitle={user.isAdmin ? 'Admin' : ''} />
        <CardActions>
            <FlatButton
                label="Change name"
                onTouchTap={showChangeProfileNameModal}
            />
            {isGithubUser(user) ?
                <FlatButton
                    label="Connect photo with GitHub"
                    onTouchTap={() => setProfileAvatar('github')}
                    disabled={isGithubAvatar(user.profile.avatar)}
                />
                :
                ''
            }
            <FlatButton
                label="Connect photo with gravatar"
                onTouchTap={() => setGravatar('gravatar')}
            />
        </CardActions>
    </Card>
;

UserCard.defaultProps = {
    user: {
        profile: {
            avatar: '',
            name: 'User',
        },
    },
};

UserCard.propTypes = {
    showChangeProfileNameModal: PropTypes.func.isRequired,
    setProfileAvatar: PropTypes.func.isRequired,
    setGravatar: PropTypes.func.isRequired,
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool.isRequired,
        profile: PropTypes.shape({
            avatar: PropTypes.string,
            name: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

export default UserCard;
