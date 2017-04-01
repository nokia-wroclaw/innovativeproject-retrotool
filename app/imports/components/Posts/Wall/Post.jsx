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
    author,
    text,
}) => (
    <Card key={id}>
        <CardHeader
            title={author.name}
            avatar={author.avatar}
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
};

Post.defaultProps = {
    author: {
        name: 'Anonymous user',
        avatar: '',
    },
};

export default Post;
