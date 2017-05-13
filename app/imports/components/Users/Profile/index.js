import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import { FullPageLoader } from '/imports/components/Loaders';

import Profile from './Profile.jsx';

const composer = (props, onData) => {
    const userHandler = Meteor.subscribe('extendedUser');

    if (userHandler.ready()) {
        const user = Meteor.user();

        onData(null, {
            user,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(Profile),
);
