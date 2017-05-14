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

        this.setGravatarPhoto = this.setGravatarPhoto.bind(this);
        this.setGithubPhoto = this.setGithubPhoto.bind(this);

        this.state = {
            showChangeProfileNameModal: false,
            openSnackbar: false,
            snackbarMessage: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.errorProfile) {
            this.hideChangeProfileNameModal();
        }
    }

    setProfileName(doc) {
        const { changeProfileName } = this.props;

        this.setState({
            openSnackbar: true,
            snackbarMessage: 'Name has been changed!',
        });

        changeProfileName(doc.text);
    }

    setGravatarPhoto() {
        const { setGravatarPhoto } = this.props;

        setGravatarPhoto();

        this.setState({
            openSnackbar: true,
            snackbarMessage: 'Set gravatar avatar',
        });
    }

    setGithubPhoto() {
        const { setGithubPhoto } = this.props;

        setGithubPhoto();

        this.setState({
            openSnackbar: true,
            snackbarMessage: 'Set github avatar',
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
                    setGravatarPhoto={this.setGravatarPhoto}
                    setGithubPhoto={this.setGithubPhoto}
                />

                <ChangeProfileName
                    open={showChangeProfileNameModal}
                    onSubmit={this.setProfileName}
                    error={errorProfile}
                    onClose={this.hideChangeProfileNameModal}
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
};

Profile.propTypes = {
    changeProfileName: PropTypes.func.isRequired,
    setGravatarPhoto: PropTypes.func.isRequired,
    setGithubPhoto: PropTypes.func.isRequired,
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
