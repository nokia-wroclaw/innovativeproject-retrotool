import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import Login from './Login.jsx';

Meteor.subscribe('userList');
Meteor.subscribe('userData');

const composer = ({ router }, onData) => {
    if (Meteor.userId()) {
        router.push('/project');
        return;
    }

    const onGithubLogin = () => {
        Meteor.loginWithGithub({}, (error) => {
            if (error) {
                const errorMessage = error.message ? error.message : error;
                onData(null, { onGithubLogin, errorMessage });
            }
        });
        console.log('Logging by Github...');

        Accounts.onLogin(() => (console.log('LOGIN')));

        Accounts.onLogout(() => (console.log('LOGOUT')));
    };

    onData(null, {
        onGithubLogin,
    });
};

export default withRouter(composeWithTracker(composer)(Login));
