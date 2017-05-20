import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Projects, actions } from '/imports/api/projects';
import { FullPageLoader } from '/imports/components/Loaders';
import Hello from './Hello.jsx';

const composer = ({ params: { projectId, sprintId } }, onData) => {
    const projectHandler = Meteor.subscribe('projectList');
    const user = Meteor.user();
    const { favouriteProjects = [] } = user && user.profile;

    if (projectHandler.ready()) {
        const projects = Projects.find({
            _id: { $in: favouriteProjects },
        }, {
            fields: { name: 1 },
        }).map(project => ({
            name: project.name,
            id: project._id,
        }));

        onData(null, {
            projects,
            goToProject: actions.goToProject,
        });
    }
};

export default composeWithTracker(
    composer,
    FullPageLoader,
)(Hello);
