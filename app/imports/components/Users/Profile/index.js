import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import { FullPageLoader } from '/imports/components/Loaders';

import { actions as userActions } from '/imports/api/users';

import Profile from './Profile.jsx';

const composer = (props, onData) => {
    const changeProfileName = async (name) => {
        try {
            await userActions.changeProfileName(name);
            onData(null, {
                user: Meteor.user(),
                changeProfileName,
            });
        } catch (error) {
            onData(null, {
                user: Meteor.user(),
                changeProfileName,
                errorProfile: error,
            });
        }
    };

    onData(null, {
        user: Meteor.user(),
        changeProfileName,
    });
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(Profile),
);
