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

const formatDate = date => moment(date).format('Do MMMM YYYY');

const ActionItem = ({
    id,
    text,
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
            subtitle={closeMessage}
            avatar={assignee.avatar}
        />

        <CardText>
            {text} <br /> <br />
            Deadline: {formatDate(endDate)} <br />
            Start date: {formatDate(startDate)}
        </CardText>

        {errorRemove && id === idToRemove ? <CardText color="red">
            {errorRemove.reason ? errorRemove.reason : errorRemove.toString()}
        </CardText> : ''}

        <CardActions>
            {isModerator ?
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
        name: 'Member',
        avatar: '',
    },
};

ActionItem.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    toggleActionItem: PropTypes.func.isRequired,
    isModerator: PropTypes.bool.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    open: PropTypes.bool.isRequired,
    assignee: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string,
    }).isRequired,
    closeMessage: PropTypes.string,
    idToRemove: PropTypes.string,
    errorRemove: PropTypes.instanceOf(Error),
};

export default ActionItem;
