import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import {
    Projects,
} from '/imports/api/projects';

import ProjectsList from './ProjectsList.jsx';


const composer = (props, onData) => {
    const projectDataHandler = Meteor.subscribe('projectList');
    const usersHandler = Meteor.subscribe('userList');

    if (projectDataHandler.ready() && usersHandler.ready()) {
        const projects = Projects.find({}).fetch();

        const options = Meteor.users.find({}).map(user => ({
            value: user._id,
            label: user.profile.name,
        }));
        onData(null, {
            projects,
            options,
        });
    }
};

export default composeWithTracker(composer)(ProjectsList);
