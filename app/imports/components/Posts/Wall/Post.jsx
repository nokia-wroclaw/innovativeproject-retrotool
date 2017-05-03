import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
    RaisedButton,
} from 'material-ui';

import PostComments from './PostComments';

const formatDate = date => moment.utc(date).fromNow();

const Post = ({
    id,
    author,
    text,
    createdAt,
    projectId,
    canRemove,
    removePost,
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
        {canRemove &&
            <CardActions>
                <RaisedButton
                    label="Remove Post"
                    onTouchTap={() => removePost(id)}
                />
            </CardActions>
        }
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
};

Post.defaultProps = {
    author: {
        name: 'Anonymous user',
        avatar: '',
    },
    canRemove: false,
};

export default Post;
