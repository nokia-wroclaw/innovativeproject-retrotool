import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import { Posts } from '/imports/api/posts';

import Wall from './Wall.jsx';

// @TODO: add categories sub
// @TODO: add posts sub

const categories = [
    { id: '1', name: 'All categories' },
    { id: '2', name: 'Some idea' },
    { id: '3', name: 'Another great idea' },
];

const composer = ({ params: { projectId } }, onData) => {
    const postsHandler = Meteor.subscribe('projectPosts', projectId);

    if (postsHandler.ready()) {
        const posts = Posts.find({}).fetch();

        onData(null, {
            posts,
            categories,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(Wall),
);
