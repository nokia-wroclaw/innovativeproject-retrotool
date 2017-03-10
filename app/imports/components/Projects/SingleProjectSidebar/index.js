import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import {
    Projects,
    actions,
} from '/imports/api/projects';

import SingleProjectSidebar from './SingleProjectSidebar.jsx';

const composer = ({ params: { projectId } }, onData) => {
    const projectListHandler = Meteor.subscribe('projectList');

    if (projectListHandler.ready()) {
        const projectList = Projects.find({}).fetch();

        onData(null, {
            projects: projectList,
            goToProject: actions.goToProject,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(SingleProjectSidebar),
);
