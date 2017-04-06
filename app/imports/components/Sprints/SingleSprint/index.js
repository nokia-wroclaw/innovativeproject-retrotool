import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import {
    Sprints,
} from '/imports/api/sprints';

import SingleSprint from './SingleSprint.jsx';

const composer = ({ params: { sprintId } }, onData) => {
    const sprintHandler = Meteor.subscribe('singleSprint', sprintId);

    if (sprintHandler.ready()) {
        const sprint = Sprints.findOne({ _id: sprintId });

        onData(null, {
            name: sprint.name,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(SingleSprint),
);
