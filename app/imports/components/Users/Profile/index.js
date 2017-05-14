import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import { FullPageLoader } from '/imports/components/Loaders';

import { actions as userActions } from '/imports/api/users';

import Profile from './Profile.jsx';

const composer = (props, onData) => {
    const user = Meteor.user();

    onData(null, {
        user,
        changeProfileName: userActions.changeProfileName,
    });
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(Profile),
);
