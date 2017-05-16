import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import { FullPageLoader } from '/imports/components/Loaders';

import { actions as userActions } from '/imports/api/users';

import Profile from './Profile.jsx';

const composer = (props, onData) => {
    const userHandler = Meteor.subscribe('userNameEmail');

    if (userHandler.ready()) {
        const changeProfileName = (name) => {
            userActions.changeProfileName(name).then((result) => {
                onData(null, {
                    user: Meteor.user(),
                    changeProfileName,
                    setProfileAvatar: userActions.setProfileAvatar,
                    result: !!result,
                });
            }).catch((error) => {
                onData(null, {
                    user: Meteor.user(),
                    changeProfileName,
                    setProfileAvatar: userActions.setProfileAvatar,
                    errorProfile: error,
                });
            });
        };

        onData(null, {
            user: Meteor.user(),
            changeProfileName,
            setProfileAvatar: userActions.setProfileAvatar,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(Profile),
);
