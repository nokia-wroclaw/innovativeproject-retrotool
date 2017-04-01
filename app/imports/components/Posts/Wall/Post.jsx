import React, { PropTypes } from 'react';
import moment from 'moment';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
    FlatButton,
} from 'material-ui';

const formatDate = date => moment(date).fromNow();

const Post = ({
    id,
    author,
    text,
    createdAt,
}) => (
    <Card key={id}>
        <CardHeader
            title={author.name}
            avatar={author.avatar}
            subtitle={`Posted at ${formatDate(createdAt)}`}
        />
        <CardText>
            {text}
        </CardText>
        <CardActions>
            <FlatButton
                label="Add comment"
                onTouchTap={() => {}}
            />
            <FlatButton
                label="See comments"
                onTouchTap={() => {}}
            />
        </CardActions>
    </Card>
);

Post.propTypes = {
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
