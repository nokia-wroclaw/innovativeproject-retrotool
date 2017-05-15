import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

import ChangeProfileName from './ChangeProfileName';
import UserCard from './UserCard.jsx';


class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.showChangeProfileNameModal = this.showChangeProfileNameModal.bind(this);
        this.hideChangeProfileNameModal = this.hideChangeProfileNameModal.bind(this);
        this.setProfileName = this.setProfileName.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);

        this.setProfileAvatar = this.setProfileAvatar.bind(this);

        this.state = {
            showChangeProfileNameModal: false,
            openSnackbar: false,
            snackbarMessage: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        const {
            errorProfile,
            result,
        } = nextProps;

        if (!errorProfile) {
            this.hideChangeProfileNameModal();
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
            snackbarMessage: 'Set gravatar avatar',
        });
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
            openSnackbar,
            snackbarMessage,
        } = this.state;

        return (
            <div className="content-container">
                <UserCard
                    user={user}
                    showChangeProfileNameModal={this.showChangeProfileNameModal}
                    setProfileAvatar={this.setProfileAvatar}
                />

                <ChangeProfileName
                    open={showChangeProfileNameModal}
                    onSubmit={this.setProfileName}
                    error={errorProfile}
                    onClose={this.hideChangeProfileNameModal}
                    oldName={user.profile.name}
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
