import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import { FullPageLoader } from '/imports/components/Loaders';
import {
    Projects,
} from '/imports/api/projects';

import SingleProject from './SingleProject.jsx';

const composer = ({ params: { projectId } }, onData) => {
    const projectsHandler = Meteor.subscribe('singleProject', projectId);
    // @TODO add sprints...
    if (projectsHandler.ready()) {
        const project = Projects.findOne({ _id: projectId });

        onData(null, {
            name: project && project.name,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(SingleProject),
);
