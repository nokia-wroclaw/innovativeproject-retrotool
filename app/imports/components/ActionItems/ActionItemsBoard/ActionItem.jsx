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
    assignee,
    toggleActionItem,
    isModerator,
    errorRemove,
    idToRemove,
    sprintId,
    onData,
    handlers,
    wrappedData,
}) => (
    <Card key={id}>
        <CardHeader
            title={assignee.name}
            subtitle={!open ? '[closed]' : ''}
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
                    label="Close action item"
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
    assignee: {
        name: 'Member',
        avatar: '',
    },
};

ActionItem.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    sprintId: PropTypes.string.isRequired,
    toggleActionItem: PropTypes.func.isRequired,
    wrappedData: PropTypes.func.isRequired,
    onData: PropTypes.func.isRequired,
    isModerator: PropTypes.bool.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    open: PropTypes.bool.isRequired,
    handlers: PropTypes.arrayOf(
        PropTypes.shape({
            subscriptionId: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    assignee: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string,
    }).isRequired,
    idToRemove: PropTypes.string,
    errorRemove: PropTypes.instanceOf(Error),
};

export default ActionItem;
