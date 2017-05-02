import React, { PropTypes } from 'react';
import moment from 'moment';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
    RaisedButton,
} from 'material-ui';

import PostComments from './PostComments';

const formatDate = date => moment(date).fromNow();

const Post = ({
    id,
    author,
    text,
    createdAt,
    projectId,
    canRemove,
    likePost,
    dislikePost,
    removePost,
    likes,
}) => (
    <Card key={id}>
        <CardHeader
            title={author.name}
            avatar={author.avatar}
            subtitle={`Posted ${formatDate(createdAt)}`}
        />
        <CardText>
            {text}
        </CardText>
        <CardActions>
            <RaisedButton
                label={`${likes}`}
                disabled
            />
            <RaisedButton
                label="Like It"
                onTouchTap={() => likePost(id)}
            />
            <RaisedButton
                label="Dislike It"
                onTouchTap={() => dislikePost(id)}
            />
            {canRemove &&
                <RaisedButton
                    label="Remove Post"
                    onTouchTap={() => removePost(id)}
                />
            }
        </CardActions>
        <PostComments
            postId={id}
            projectId={projectId}
        />
    </Card>
);

Post.propTypes = {
    projectId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
    }),
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    canRemove: PropTypes.bool.isRequired,
    removePost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    dislikePost: PropTypes.func.isRequired,
    likes: PropTypes.number.isRequired,
};

Post.defaultProps = {
    author: {
        name: 'Anonymous user',
        avatar: '',
    },
    canRemove: false,
    likes: 0,
};

export default Post;
