import React, { PropTypes } from 'react';
import moment from 'moment';
import {
    Card,
    CardHeader,
    CardText,
} from 'material-ui';

const formatDate = date => `Commented ${moment(date).fromNow()}`;


const Comment = ({ author, createdAt, text }) =>
    <Card>
        <CardHeader
            title={author.name}
            avatar={author.avatar}
            subtitle={formatDate(createdAt)}
        />
        <CardText>
            {text}
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
