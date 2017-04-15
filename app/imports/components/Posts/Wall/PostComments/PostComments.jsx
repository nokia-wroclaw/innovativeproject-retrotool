import React, { PropTypes } from 'react';

import { CardText } from 'material-ui';

import AddComment from './AddComment.jsx';
import Comment from './Comment.jsx';

const PostComments = ({ comments, postId, addPostComment }) => (
    <CardText>
        {comments.map((comment) => {
            const {
                id,
                text,
                author,
                createdAt,
            } = comment;

            return (
                <Comment
                    key={id}
                    text={text}
                    author={author}
                    createdAt={createdAt}
                />
            );
        })}
        <AddComment
            postId={postId}
            addPostComment={addPostComment}
        />
    </CardText>
);

PostComments.propTypes = {
    postId: PropTypes.string.isRequired,
    addPostComment: PropTypes.func.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            author: PropTypes.shape({
                name: PropTypes.string.isRequired,
                avatar: PropTypes.string.isRequired,
            }).isRequired,
            createdAt: PropTypes.instanceOf(Date).isRequired,
        }),
    ).isRequired,
};

export default PostComments;
