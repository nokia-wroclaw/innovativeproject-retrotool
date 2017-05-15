import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import { FullPageLoader } from '/imports/components/Loaders';

import { actions as userActions } from '/imports/api/users';

import Profile from './Profile.jsx';

const composer = (props, onData) => {
    const userHandler = Meteor.subscribe('userNameEmail');

    if (userHandler.ready()) {
        const changeProfileName = async (name) => {
            try {
                const result = await userActions.changeProfileName(name);
                onData(null, {
                    user: Meteor.user(),
                    changeProfileName,
                    setGravatarPhoto: userActions.setGravatarPhoto,
                    setGithubPhoto: userActions.setGithubPhoto,
                    result: !!result,
                });
            } catch (error) {
                onData(null, {
                    user: Meteor.user(),
                    changeProfileName,
                    setGravatarPhoto: userActions.setGravatarPhoto,
                    setGithubPhoto: userActions.setGithubPhoto,
                    errorProfile: error,
                });
            }
        };

        onData(null, {
            user: Meteor.user(),
            changeProfileName,
            setGravatarPhoto: userActions.setGravatarPhoto,
            setGithubPhoto: userActions.setGithubPhoto,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(Profile),
);
