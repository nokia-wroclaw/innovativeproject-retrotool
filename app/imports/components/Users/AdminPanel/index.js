import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import {
    Projects,
} from '/imports/api/projects';

import Panel from './Panel.jsx';
import UsersManagement from './UsersManagement/UsersManagement.jsx';
import ProjectsManagement from './ProjectsManagement.jsx';


const composer = (props, onData) => {
    const handler = Meteor.subscribe('userData');
    const projectsHandler = Meteor.subscribe('projectList');
    console.log('In Composer users', handler.ready());
    console.log('In Composer projects ', projectsHandler.ready());

    if (handler.ready() && projectsHandler.ready()) {
        const admin = Meteor.users.findOne({}).isAdmin;
        const projects = Projects.find({}).fetch();
        console.log('In Composer 2', handler.ready());
        onData(null, {
            admin,
            projects,
        });
    }
    return 0;
};
const Container = composeWithTracker(composer)(UsersManagement);
export { Container };
const Container2 = composeWithTracker(composer)(ProjectsManagement);
export { Container2 };
export default composeWithTracker(composer)(Panel);
