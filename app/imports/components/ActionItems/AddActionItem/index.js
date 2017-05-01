import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import { FullPageLoader } from '/imports/components/Loaders';
import AddActionItem from './AddActionItem.jsx';


const composer = (props, onData) => {
    const usersHandler = Meteor.subscribe('userList');

    if (usersHandler.ready()) {
        const options = Meteor.users.find({}).map(user => ({
            value: user._id,
            label: user.profile.name,
        }));
        onData(null, {
            options,
        });
    }
};

export default withRouter(
      composeWithTracker(
        composer,
        FullPageLoader,
    )(AddActionItem),
);
