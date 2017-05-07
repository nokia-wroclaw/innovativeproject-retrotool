import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
    Card,
    CardActions,
    CardText,
    RaisedButton,
    CardHeader,
} from 'material-ui';

import '../Style/ActionItems.css';

const formatDate = date => moment(date).format('Do MMMM YYYY');

const ActionItem = ({
    id,
    text,
    userId,
    startDate,
    endDate,
    open,
    closeMessage,
    assignee,
    toggleActionItem,
    isModerator,
    errorRemove,
    idToRemove,
}) => (
    <Card key={id}>
        <CardHeader
            title={!open ? `${assignee.name} [closed]` : assignee.name}
            avatar={assignee.avatar}
        />

        <CardText>
            <p>{text}</p>
            {open && closeMessage ?
                <p><del>Close message: { closeMessage }</del></p>
                :
                ''
            }
            {!open && closeMessage ?
                <p>Close message: { closeMessage }</p>
                :
                ''
            }
            <p>
                <span>Deadline: {formatDate(endDate)}</span>
                <span>Start date: {formatDate(startDate)}</span>
            </p>
        </CardText>

        {errorRemove && id === idToRemove ?
            <CardText color="red">
                {errorRemove.reason ? errorRemove.reason : errorRemove.toString()}
            </CardText>
            :
            ''
        }

        <CardActions>
            {isModerator || userId === assignee._id ?
                <RaisedButton
                    label={open ? 'Close action item' : 'Reopen action item'}
                    onTouchTap={toggleActionItem}
                    secondary={open}
                />
                :
                ''
            }
        </CardActions>
    </Card>
);

ActionItem.defaultProps = {
    errorRemove: null,
    idToRemove: '',
    closeMessage: '',
    assignee: {
        _id: '',
        name: 'Not assigned',
        avatar: '',
    },
};

ActionItem.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    toggleActionItem: PropTypes.func.isRequired,
    isModerator: PropTypes.bool.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    open: PropTypes.bool.isRequired,
    assignee: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string,
    }).isRequired,
    closeMessage: PropTypes.string,
    idToRemove: PropTypes.string,
    errorRemove: PropTypes.instanceOf(Error),
};

export default ActionItem;
