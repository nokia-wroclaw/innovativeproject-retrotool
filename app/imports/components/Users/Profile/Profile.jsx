import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardActions,
    CardMedia,
    CardTitle,
    FlatButton,
} from 'material-ui';

import ChangeProfileName from './ChangeProfileName';


class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.showChangeProfileNameModal = this.showChangeProfileNameModal.bind(this);
        this.hideChangeProfileNameModal = this.hideChangeProfileNameModal.bind(this);
        this.setProfileName = this.setProfileName.bind(this);

        this.state = {
            showChangeProfileNameModal: false,
        };
    }

    setProfileName(doc) {
        const { changeProfileName } = this.props;

        this.hideChangeProfileNameModal();

        changeProfileName(doc.text);
    }

    showChangeProfileNameModal() {
        this.setState({
            showChangeProfileNameModal: true,
        });
    }

    hideChangeProfileNameModal() {
        this.setState({
            showChangeProfileNameModal: false,
        });
    }

    render() {
        const {
            user,
            errorProfile,
        } = this.props;

        const {
            showChangeProfileNameModal,
        } = this.state;

        return (
            <div className="content-container">
                <Card className="profile-container">
                    <CardMedia>
                        <img src={user.profile.avatar} alt="My avatar" />
                    </CardMedia>
                    <CardTitle title={user.profile.name} subtitle={user.isAdmin ? 'Admin' : ''} />
                    <CardActions>
                        <FlatButton
                            label="Change name"
                            onTouchTap={this.showChangeProfileNameModal}
                        />
                        <FlatButton label="Connect photo with github" />
                        <FlatButton label="Connect photo with gravatar" />
                    </CardActions>
                </Card>

                <ChangeProfileName
                    open={showChangeProfileNameModal}
                    onSubmit={this.setProfileName}
                    error={errorProfile}
                    onClose={this.hideChangeProfileNameModal}
                />
            </div>
        );
    }
}

Profile.defaultProps = {
    errorProfile: null,
};

Profile.propTypes = {
    changeProfileName: PropTypes.func.isRequired,
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool.isRequired,
        profile: PropTypes.shape({
            avatar: PropTypes.string,
            name: PropTypes.string,
        }).isRequired,
    }).isRequired,
    errorProfile: PropTypes.instanceOf(Error),
};

export default Profile;
