import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { FullPageLoader } from '/imports/components/Loaders';
import {
    Projects,
    isProjectModerator,
    actions,
} from '/imports/api/projects';
import SingleProject from './SingleProject.jsx';

const {
    starProject,
    unstarProject,
    goToProjectMembers,
} = actions;

const composer = ({ params: { projectId } }, onData) => {
    const projectsHandler = Meteor.subscribe('singleProject', projectId);

    if (projectsHandler.ready()) {
        const project = Projects.findOne({ _id: projectId });
        const isFavouriteProject = _
            .get(Meteor.user(), 'profile.favouriteProjects', [])
            .indexOf(projectId) !== -1
        ;

        onData(null, {
            projectId,
            name: project && project.name,
            isFavouriteProject,
            starProject,
            unstarProject,
            goToProjectMembers,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(SingleProject),
);
