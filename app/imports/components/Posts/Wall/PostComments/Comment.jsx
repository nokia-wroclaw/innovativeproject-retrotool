import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import {
    Card,
    CardHeader,
    CardText,
    CardActions,
    FlatButton,
} from 'material-ui';
import Delete from 'material-ui/svg-icons/action/delete';

const formatDate = date => `Commented ${moment.utc(date).fromNow()}`;

const Comment = ({ id, author, canRemove, createdAt, text, removeComment }) =>
    <Card className="post-comment">
        <CardHeader
            title={author.name}
            avatar={author.avatar}
            subtitle={formatDate(createdAt)}
        />
        <CardText>
            <ReactMarkdown source={text} />
        </CardText>
        {canRemove &&
            <CardActions>
                <FlatButton
                    icon={<Delete />}
                    label="Remove Comment"
                    onTouchTap={() => removeComment(id)}
                />
            </CardActions>
        }
    </Card>
;

Comment.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    canRemove: PropTypes.bool.isRequired,
    removeComment: PropTypes.func.isRequired,
};

Comment.defaultProps = {
    canRemove: false,
    removeComment() {},
};

export default Comment;
