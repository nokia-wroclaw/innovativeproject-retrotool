import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter, browserHistory } from 'react-router';

import MainLayout from './MainLayout.jsx';

const composer = ({ router }, onData) => {
    const onLogOut = () => Meteor.logout(() => {
        browserHistory.push('/login');
    });

    onData(null, {
        onLogOut,
    });
};

export default withRouter(
    composeWithTracker(
        composer,
    )(MainLayout),
);
