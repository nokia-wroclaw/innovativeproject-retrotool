import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import _ from 'lodash';

import {
    actions,
    Comments,
 } from '/imports/api/comments';

import PostComments from './PostComments.jsx';

const composer = (props, onData) => {
    const {
        postId,
        projectId,
     } = props;
    const commentsHandler = Meteor.subscribe('postComments', postId);
    const usersHandler = Meteor.subscribe('projectMembers', projectId);

    if (commentsHandler.ready() && usersHandler.ready()) {
        const users = Meteor.users.find({}, {
            fields: {
                'profile.name': 1,
                'profile.avatar': 1,
            },
        }).fetch();

        const comments = Comments.find({ postId }).map((comment) => {
            const {
                _id: id,
                text,
                createdAt,
                showAuthor,
            } = comment;

            const user = showAuthor ?
                    _.find(users, { _id: comment.authorId })
                :
                    { profile: { name: 'Anonymous user', avatar: '' } }
                ;

            const author = {
                name: _.get(user, 'profile.name', ''),
                avatar: _.get(user, 'profile.avatar', ''),
            };

            return ({
                id,
                text,
                createdAt,
                author,
            });
        });

        onData(null, {
            comments,
            postId,
            addPostComment: actions.addPostComment,
        });
    }
};

export default composeWithTracker(
    composer,
)(PostComments);
