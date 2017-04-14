import React, { PropTypes } from 'react';
import moment from 'moment';
import {
    Card,
    CardHeader,
    CardText,
} from 'material-ui';

import PostComments from './PostComments';

const formatDate = date => moment(date).fromNow();

const Post = ({
    id,
    author,
    text,
    createdAt,
    projectId,
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
};

Post.defaultProps = {
    author: {
        name: 'Anonymous user',
        avatar: '',
    },
};

export default Post;
