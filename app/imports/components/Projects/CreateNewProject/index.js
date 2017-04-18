import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import { FullPageLoader } from '/imports/components/Loaders';
import { actions } from '/imports/api/projects';

import CreateNewProject from './CreateNewProject.jsx';

const wrappedOnData = (handler, onData, data) => {
    if (handler.ready()) {
        const options = Meteor.users.find({}).map(user => ({
            value: user._id,
            label: user.profile.name,
        }));

        onData(null, {
            options,
            ...data,
        });
    }
};

const composer = (props, onData) => {
    const usersHandler = Meteor.subscribe('userList');

    const onSubmit = async (doc) => {
        try {
            const { name, moderators, members } = doc;
            const projectId = await actions.createNewProject(name, moderators, members);
            actions.goToProject(projectId);
        } catch (error) {
            wrappedOnData(usersHandler, onData, { onSubmit, error });
        }
    };

    wrappedOnData(usersHandler, onData, { onSubmit });
};

export default withRouter(
      composeWithTracker(
        composer,
        FullPageLoader,
    )(CreateNewProject),
);
