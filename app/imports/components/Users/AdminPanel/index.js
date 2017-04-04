import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import {
    Projects,
} from '/imports/api/projects';

import Panel from './Panel.jsx';


const composer = (props, onData) => {
    const handler = Meteor.subscribe('userData');
    const projectsHandler = Meteor.subscribe('projectList');


    if (handler.ready() && projectsHandler.ready()) {
        const admin = Meteor.users.findOne({}).isAdmin;
        const projects = Projects.find({}).fetch();
        onData(null, {
            admin,
            projects,
        });
    }

    onData(null, {});
};

export default composeWithTracker(composer)(Panel);
