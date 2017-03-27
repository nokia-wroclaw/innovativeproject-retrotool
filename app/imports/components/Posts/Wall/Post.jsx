import React, { PropTypes } from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
    FlatButton,
} from 'material-ui';

const Post = ({
    id,
    showAuthor,
    author,
    text,
}) => (
    <Card key={id}>
        {showAuthor ?
            <CardHeader
                title={author.name}
                avatar={author.avatar}
            />
            :
            <CardHeader
                title="Anonymous post"
            />
        }
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
    showAuthor: PropTypes.bool.isRequired,
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
    }),
    text: PropTypes.string.isRequired,
};

// @TODO add default avatar
Post.defaultProps = {
    showAuthor: false,
    author: {
        name: 'Anonymous user',
        avatar: '',
    },
};

export default Post;
