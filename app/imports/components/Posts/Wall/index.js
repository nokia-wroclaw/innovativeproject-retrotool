import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import { Posts } from '/imports/api/posts';
import { Categories } from '/imports/api/categories';

import Wall from './Wall.jsx';

const composer = ({ params: { projectId } }, onData) => {
    const postsHandler = Meteor.subscribe('projectPosts', projectId);
    const categoriesHandler = Meteor.subscribe('categories');

    if (postsHandler.ready() && categoriesHandler.ready()) {
        const posts = Posts.find({}).fetch();
        const categories = Categories.find({}).fetch();

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
