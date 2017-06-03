import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import {
    Projects,
    actions,
} from '/imports/api/projects';
import { isAdmin } from '/imports/api/users';
import ProjectList, { renderProjectListItems } from './ProjectList.jsx';

const {
    goToProject,
    goToAddProject,
} = actions;

const composer = (props, onData) => {
    const projectsHandler = Meteor.subscribe('projectList');
    const showCreateLink = isAdmin();
    const user = Meteor.user();
    const { favouriteProjects = [] } = user && user.profile;

    if (projectsHandler.ready()) {
        const projects = Projects.find({}).fetch();
        const {
            starProject,
            unstarProject,
        } = actions;

        onData(null, {
            projects,
            onTouchTap: goToProject,
            goToAddProject,
            showCreateLink,
            favouriteProjects,
            starProject,
            unstarProject,
        });
    }
};

export { renderProjectListItems };

export default composeWithTracker(
    composer,
)(ProjectList);
