import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Snackbar from 'material-ui/Snackbar';

import ChangeProfileName from './ChangeProfileName';
import SetGravatar from './SetGravatar';
import UserCard from './UserCard.jsx';


class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.showChangeProfileNameModal = this.showChangeProfileNameModal.bind(this);
        this.setProfileName = this.setProfileName.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);

        this.setProfileAvatar = this.setProfileAvatar.bind(this);
        this.hideChangeModal = this.hideChangeModal.bind(this);
        this.showSetGravatarModal = this.showSetGravatarModal.bind(this);
        this.setGravatar = this.setGravatar.bind(this);

        this.state = {
            showChangeProfileNameModal: false,
            showSetGravatarModal: false,
            openSnackbar: false,
            snackbarMessage: '',
            service: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        const {
            errorProfile,
            result,
        } = nextProps;

        if (!errorProfile) {
            this.hideChangeModal();
        }
        if (result) {
            this.setState({
                openSnackbar: true,
                snackbarMessage: 'Name has been changed!',
            });
        }
    }

    setProfileName(doc) {
        const { changeProfileName } = this.props;

        changeProfileName(doc.text);
    }

    setProfileAvatar(service) {
        const { setProfileAvatar } = this.props;

        setProfileAvatar(service);

        this.setState({
            openSnackbar: true,
            snackbarMessage: 'Set GitHub avatar',
        });
    }

    setGravatar(doc) {
        const { setProfileAvatar } = this.props;
        const { service } = this.state;

        setProfileAvatar(service, doc.address).then(() => {
            this.hideChangeModal();
        });

        this.setState({
            openSnackbar: true,
            snackbarMessage: 'Set gravatar avatar',
        });
    }

    showChangeProfileNameModal() {
        this.setState({
            showChangeProfileNameModal: true,
        });
    }

    hideChangeModal() {
        this.setState({
            showChangeProfileNameModal: false,
            showSetGravatarModal: false,
        });
    }

    showSetGravatarModal(service) {
        this.setState({
            showSetGravatarModal: true,
            service,
        });
    }

    closeSnackBar() {
        this.setState({
            openSnackbar: false,
        });
    }

    render() {
        const {
            user,
            errorProfile,
        } = this.props;

        const {
            showChangeProfileNameModal,
            showSetGravatarModal,
            openSnackbar,
            snackbarMessage,
        } = this.state;

        const userEmail = _.get(user, 'emails[0].address');

        return (
            <div className="content-container">
                <UserCard
                    user={user}
                    showChangeProfileNameModal={this.showChangeProfileNameModal}
                    setGravatar={this.showSetGravatarModal}
                    setProfileAvatar={this.setProfileAvatar}
                />

                <ChangeProfileName
                    open={showChangeProfileNameModal}
                    onSubmit={this.setProfileName}
                    error={errorProfile}
                    onClose={this.hideChangeModal}
                    oldName={user.profile.name}
                />

                <SetGravatar
                    open={showSetGravatarModal}
                    onSubmit={this.setGravatar}
                    onClose={this.hideChangeModal}
                    email={userEmail}
                />

                <Snackbar
                    open={openSnackbar}
                    message={snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.closeSnackBar}
                />
            </div>
        );
    }
}

Profile.defaultProps = {
    errorProfile: null,
    result: false,
};

Profile.propTypes = {
    changeProfileName: PropTypes.func.isRequired,
    setProfileAvatar: PropTypes.func.isRequired,
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool.isRequired,
        profile: PropTypes.shape({
            avatar: PropTypes.string,
            name: PropTypes.string,
        }).isRequired,
    }).isRequired,
    errorProfile: PropTypes.instanceOf(Error),
    result: PropTypes.bool,
};

export default Profile;
