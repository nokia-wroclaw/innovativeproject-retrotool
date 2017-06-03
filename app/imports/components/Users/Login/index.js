import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import { FullPageLoader } from '/imports/components/Loaders';

import Login from './Login.jsx';

const composer = ({ router }, onData) => {
    const user = Meteor.user();
    if (user) {
        const { lastViewedProject } = user.profile || {};
        if (lastViewedProject) {
            router.push(`/project/${lastViewedProject}`);
        } else {
            router.push('/hello');
        }
        return;
    }

    const onGithubLogin = () => Meteor.loginWithGithub({}, (error) => {
        if (error) {
            const errorMessage = error.message ? error.message : error;
            onData(null, { onGithubLogin, errorMessage });
        }
    });

    onData(null, {
        onGithubLogin,
    });
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(Login),
);
