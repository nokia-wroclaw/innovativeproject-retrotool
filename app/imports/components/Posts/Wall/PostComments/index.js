import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import _ from 'lodash';

import {
    actions,
    Comments,
 } from '/imports/api/comments';

import PostComments from './PostComments.jsx';

const getUsers = () => Meteor.users.find({}, {
    fields: {
        'profile.name': 1,
        'profile.avatar': 1,
    },
}).fetch();

const getComments = (postId) => {
    const users = getUsers();

    return Comments.find({ postId }).map((comment) => {
        const {
            _id: id,
            text,
            createdAt,
            showAuthor,
        } = comment;

        const user = showAuthor && _.find(users, { _id: comment.authorId });
        const author = {
            name: _.get(user, 'profile.name', 'Anonymous user'),
            avatar: _.get(user, 'profile.avatar', ''),
        };

        return ({ id, text, createdAt, author });
    });
};

const wrappedOnData = (handler1, handler2, postId, onData, data) => {
    if (handler1.ready() && handler2.ready()) {
        const comments = getComments(postId);

        onData(null, {
            comments,
            ...data,
        });
    }
};

const composer = (props, onData) => {
    const {
        postId,
        projectId,
        isMember,
     } = props;

    const usersHandler = Meteor.subscribe('projectMembers', projectId);
    const commentsHandler = Meteor.subscribe('postComments', postId);

    const addPostComment = async (doc) => {
        try {
            await actions.addPostComment({ postId, ...doc });
        } catch (errorAddPostComment) {
            wrappedOnData(usersHandler, commentsHandler, postId, onData, {
                addPostComment,
                errorAddPostComment,
                removeComment: actions.removePostComment,
                isMember,
            });
        }
    };

    wrappedOnData(usersHandler, commentsHandler, postId, onData, {
        addPostComment,
        removeComment: actions.removePostComment,
        isMember,
    });
};

export default composeWithTracker(
    composer,
)(PostComments);
