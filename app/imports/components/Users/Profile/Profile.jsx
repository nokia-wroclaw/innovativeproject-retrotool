import React from 'react';
import PropTypes from 'prop-types';

import ChangeProfileName from './ChangeProfileName';
import UserCard from './UserCard.jsx';


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

    componentWillReceiveProps(nextProps) {
        if (!nextProps.errorProfile) {
            this.hideChangeProfileNameModal();
        }
    }

    setProfileName(doc) {
        const { changeProfileName } = this.props;

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
                <UserCard
                    user={user}
                    showChangeProfileNameModal={this.showChangeProfileNameModal}
                />

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
