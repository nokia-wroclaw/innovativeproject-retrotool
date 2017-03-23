import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import Login from './Login.jsx';

const composer = ({ router }, onData) => {
    if (Meteor.userId()) {
        router.push('/hello');
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
    )(Login),
);
