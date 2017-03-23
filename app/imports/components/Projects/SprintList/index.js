import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import {
    Sprints,
} from '/imports/api/sprints';

import SprintList from './SprintList.jsx';

const composer = (props, onData) => {
    const projectsHandler = Meteor.subscribe('sprintList');

    if (projectsHandler.ready()) {
        const sprints = Sprints.find({}).fetch();

        onData(null, {
            sprints,
        });
    }
};

export default composeWithTracker(
    composer,
)(SprintList);
