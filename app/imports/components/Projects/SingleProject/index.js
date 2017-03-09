import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import {
    Projects,
} from '/imports/api/projects';

import SingleProject from './SingleProject.jsx';

const composer = ({ params: { projectId } }, onData) => {
    const projectsHandler = Meteor.subscribe('singleProject', projectId);

    if (projectsHandler.ready()) {
        const project = Projects.findOne({ _id: projectId });

        onData(null, {
            name: project.name,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(SingleProject),
);
