import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import _ from 'lodash';

import {
    Posts,
    actions,
} from '/imports/api/posts';
import { Categories } from '/imports/api/categories';

import Wall from './Wall.jsx';

const composer = ({ params: { projectId } }, onData) => {
    const projectHandler = Meteor.subscribe('singleProject', projectId);
    const postsHandler = Meteor.subscribe('projectPosts', projectId);
    const categoriesHandler = Meteor.subscribe('categories');
    const usersHandler = Meteor.subscribe('projectMembers', projectId);

    if (
        projectHandler.ready() &&
        postsHandler.ready() &&
        categoriesHandler.ready() &&
        usersHandler.ready()
    ) {
        const users = Meteor.users.find().fetch();
        const categories = Categories.find({}).fetch();
        const posts = Posts.find({}).map((post) => {
            if (post.showAuthor) {
                const author = _.find(users, { _id: post.authorId });
                post.author = {
                    name: _.get(author, 'profile.name', undefined),
                    avatar: _.get(author, 'profile.avatar', ''),
                };
            }
            return post;
        });

        onData(null, {
            addPost: actions.addPost,
            categories,
            posts,
            projectId,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(Wall),
);
