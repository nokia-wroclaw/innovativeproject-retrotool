import { composeWithTracker } from 'react-komposer';
import { FullPageLoader } from '/imports/components/Loaders';
import {
    isAdmin,
    isLoggedIn,
} from '/imports/api/users';
import MainLayout from './MainLayout.jsx';

const composer = (props, onData) => {
    const isLoggedInUser = isLoggedIn();
    const isCurrentUserAdmin = isAdmin();

    onData(null, {
        isLoggedInUser,
        isCurrentUserAdmin,
    });
};

export default composeWithTracker(
    composer,
    FullPageLoader,
)(MainLayout);
