import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import _ from 'lodash';

import { FullPageLoader } from '/imports/components/Loaders';
import {
    Posts,
    actions,
} from '/imports/api/posts';
import { Categories } from '/imports/api/categories';

import Wall from './Wall.jsx';

const composer = ({ params: { projectId, sprintId } }, onData) => {
    const projectHandler = Meteor.subscribe('singleProject', projectId);
    const sprintHandler = Meteor.subscribe('singleSprint', sprintId);
    const postsHandler = Meteor.subscribe('sprintPosts', sprintId);
    const categoriesHandler = Meteor.subscribe('categories');
    const usersHandler = Meteor.subscribe('projectMembers', projectId);

    if (
        projectHandler.ready() &&
        sprintHandler.ready() &&
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
                    name: _.get(author, 'profile.name', ''),
                    avatar: _.get(author, 'profile.avatar', ''),
                };
            }
            return post;
        });

        onData(null, {
            addPost: actions.addPost,
            categories,
            posts,
            sprintId,
            projectId,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(Wall),
);
