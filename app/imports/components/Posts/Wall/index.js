import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import _ from 'lodash';

import { FullPageLoader } from '/imports/components/Loaders';
import {
    isProjectModeratorOrAdmin,
    isProjectMember,
} from '/imports/api/projects';
import { isSprintClosed } from '/imports/api/sprints';
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
    const categoriesHandler = Meteor.subscribe('categories', projectId);
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
                color: category.color,
            }),
        );
        const posts = Posts.find({}).map((post) => {
            const {
                showAuthor,
                authorId,
            } = post;

            const category = _.find(categories, c => c.value === post.categoryId) || {};
            post.categoryName = category.label;
            post.categoryColor = category.color;

            if (showAuthor) {
                const author = _.find(users, { _id: authorId });
                post.author = {
                    name: _.get(author, 'profile.name', ''),
                    avatar: _.get(author, 'profile.avatar', ''),
                };
            }
            return post;
        });

        const userId = Meteor.userId();
        const hasModeratorRights = isProjectModeratorOrAdmin(projectId, userId);
        const isMember = isProjectMember(projectId, userId);
        const isSprintOpen = !isSprintClosed(sprintId);

        onData(null, {
            addPost: actions.addPost,
            removePost: actions.removePost,
            likePost: actions.likePost,
            removeLike: actions.removeLike,
            dislikePost: actions.dislikePost,
            removeDislike: actions.removeDislike,
            categories,
            posts,
            sprintId,
            projectId,
            isProjectModeratorOrAdmin: hasModeratorRights,
            isSprintOpen,
            userId,
            isMember,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(Wall),
);
