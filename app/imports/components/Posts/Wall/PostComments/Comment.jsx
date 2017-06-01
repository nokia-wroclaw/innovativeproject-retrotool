import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import {
    Card,
    CardHeader,
    CardText,
} from 'material-ui';

const formatDate = date => `Commented ${moment.utc(date).fromNow()}`;


const Comment = ({ author, createdAt, text }) =>
    <Card className="post-comment">
        <CardHeader
            title={author.name}
            avatar={author.avatar}
            subtitle={formatDate(createdAt)}
        />
        <CardText>
            <ReactMarkdown source={text} />
        </CardText>
    </Card>
;

Comment.propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
};

export default Comment;
