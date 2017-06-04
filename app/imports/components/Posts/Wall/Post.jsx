import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
    Chip,
    RaisedButton,
} from 'material-ui';
import Delete from 'material-ui/svg-icons/action/delete';

import PostComments from './PostComments';
import Likes from './Likes.jsx';

const formatDate = date => moment.utc(date).fromNow();

const Post = ({
    id,
    author,
    text,
    categoryName,
    categoryColor,
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
    isMember,
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
            <Chip backgroundColor={categoryColor}>{categoryName}</Chip>
            <ReactMarkdown source={text} />
        </CardText>

        <CardActions>
            {isMember ?
                <Likes
                    likePost={likePost}
                    removeLike={removeLike}
                    dislikePost={dislikePost}
                    removeDislike={removeDislike}
                    likes={likes}
                    dislikes={dislikes}
                    isLiked={isLiked}
                    isDisliked={isDisliked}
                    id={id}
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
            isMember={isMember}
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
    categoryName: PropTypes.string.isRequired,
    categoryColor: PropTypes.string.isRequired,
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
    isMember: PropTypes.bool.isRequired,
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
