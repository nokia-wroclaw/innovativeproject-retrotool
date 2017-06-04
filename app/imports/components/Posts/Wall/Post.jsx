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
    FlatButton,
    LinearProgress,
} from 'material-ui';
import Delete from 'material-ui/svg-icons/action/delete';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import { blue500 } from 'material-ui/styles/colors';

import PostComments from './PostComments';
import { styles } from './styles.js';

const formatDate = date => moment.utc(date).fromNow();

const Post = ({
    id,
    author,
    text,
    createdAt,
    projectId,
    canRemove,
    likePost,
    removeLike,
    dislikePost,
    removeDislike,
    removePost,
    likes,
    dislikes,
    isLiked,
    isDisliked,
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
            {!isLiked ?
                <FlatButton
                    icon={<ThumbUp />}
                    label={likes}
                    onTouchTap={() => likePost(id)}
                />
                :
                <FlatButton
                    icon={<ThumbUp color={blue500} />}
                    label={likes}
                    onTouchTap={() => removeLike(id)}
                />
            }
            {!isDisliked ?
                <FlatButton
                    icon={<ThumbDown />}
                    label={dislikes}
                    onTouchTap={() => dislikePost(id)}
                />
                :
                <FlatButton
                    icon={<ThumbDown color={blue500} />}
                    label={dislikes}
                    onTouchTap={() => removeDislike(id)}
                />
            }
            {likes ?
                <LinearProgress
                    mode="determinate"
                    value={likes}
                    max={likes + dislikes}
                    style={styles.LinearProgress}
                />
                :
                ''
            }

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
            canRemove={canRemove}
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
    removeLike: PropTypes.func.isRequired,
    dislikePost: PropTypes.func.isRequired,
    removeDislike: PropTypes.func.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    isDisliked: PropTypes.bool.isRequired,
};

Post.defaultProps = {
    author: {
        name: 'Anonymous user',
        avatar: '',
    },
    canRemove: false,
    likes: 0,
    dislikes: 0,
    isLiked: false,
    isDisliked: false,
};

export default Post;
