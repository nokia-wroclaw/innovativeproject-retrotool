import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import _ from 'lodash';

import { FullPageLoader } from '/imports/components/Loaders';
import { isAdmin } from '/imports/api/users';
import { isProjectModerator } from '/imports/api/projects';
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
        const categories = Categories.find({}).map(category =>
            ({
                value: category._id,
                label: category.name,
            }),
        );
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

        const userId = Meteor.userId();
        const isProjectModeratorOrAdmin = isAdmin() || isProjectModerator(projectId, userId);

        onData(null, {
            addPost: actions.addPost,
            removePost: actions.removePost,
            categories,
            posts,
            sprintId,
            projectId,
            isProjectModeratorOrAdmin,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(Wall),
);
