import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

<<<<<<< HEAD
=======
import { FullPageLoader } from '/imports/components/Loaders';
>>>>>>> origin/devel
import {
    Projects,
} from '/imports/api/projects';

import SingleProject from './SingleProject.jsx';

const composer = ({ params: { projectId } }, onData) => {
    const projectsHandler = Meteor.subscribe('singleProject', projectId);
<<<<<<< HEAD
    // @todo add sprints...
=======
    // @TODO add sprints...
>>>>>>> origin/devel
    if (projectsHandler.ready()) {
        const project = Projects.findOne({ _id: projectId });

        onData(null, {
<<<<<<< HEAD
            name: project.name,
=======
            name: project && project.name,
>>>>>>> origin/devel
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
<<<<<<< HEAD
=======
        FullPageLoader,
>>>>>>> origin/devel
    )(SingleProject),
);
