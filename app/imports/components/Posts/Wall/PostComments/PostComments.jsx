import React from 'react';
import PropTypes from 'prop-types';

import { CardText } from 'material-ui';

import AddComment from './AddComment.jsx';
import Comment from './Comment.jsx';

const PostComments = ({ comments, addPostComment, errorAddPostComment, ...props }) => (
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
                    id={id}
                    text={text}
                    author={author}
                    createdAt={createdAt}
                    {...props}
                />
            );
        })}
        <AddComment
            error={errorAddPostComment}
            onSubmit={addPostComment}
        />
    </CardText>
);

PostComments.propTypes = {
    errorAddPostComment: PropTypes.instanceOf(Error),
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

PostComments.defaultProps = {
    errorAddPostComment: null,
};


export default PostComments;
