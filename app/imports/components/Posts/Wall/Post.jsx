import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
    RaisedButton,
} from 'material-ui';
import Delete from 'material-ui/svg-icons/action/delete';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';

import PostComments from './PostComments';

const formatDate = date => moment.utc(date).fromNow();

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
    dislikes,
}) => (
    <Card
        className="post"
        key={id}
    >
        <CardHeader
            title={author.name}
            avatar={author.avatar}
            subtitle={`Posted ${formatDate(createdAt)}`}
        />
        <CardText>
            <ReactMarkdown source={text} />
        </CardText>
        <CardActions>
            <RaisedButton
                icon={<ThumbUp />}
                label={`Like It (${likes})`}
                onTouchTap={() => likePost(id)}
            />
            <RaisedButton
                icon={<ThumbDown />}
                label={`Dislike It (${dislikes})`}
                onTouchTap={() => dislikePost(id)}
            />
            {canRemove &&
                <RaisedButton
                    icon={<Delete />}
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
    dislikes: PropTypes.number.isRequired,
};

Post.defaultProps = {
    author: {
        name: 'Anonymous user',
        avatar: '',
    },
    canRemove: false,
    likes: 0,
    dislikes: 0,
};

export default Post;
