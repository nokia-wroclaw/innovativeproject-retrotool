import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import { FullPageLoader } from '/imports/components/Loaders';
import {
    Projects,
    actions,
} from '/imports/api/projects';

import SingleProject from './SingleProject.jsx';

const composer = ({ params: { projectId } }, onData) => {
    const projectsHandler = Meteor.subscribe('singleProject', projectId);
    const user = Meteor.user();
    const { favouriteProjects = [] } = user && user.profile;
    const isFavouriteProject = favouriteProjects.indexOf(projectId) !== -1;

    if (projectsHandler.ready()) {
        const project = Projects.findOne({ _id: projectId });
        const {
            starProject,
            unstarProject,
        } = actions;

        onData(null, {
            projectId,
            name: project && project.name,
            isFavouriteProject,
            starProject,
            unstarProject,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(SingleProject),
);
