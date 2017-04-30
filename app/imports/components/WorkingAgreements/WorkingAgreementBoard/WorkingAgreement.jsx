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

const WorkingAgreement = ({
    id,
    text,
    date,
    deleteWorkingAgreement,
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
            title={text}
            subtitle={formatDate(date)}
        />

        {errorRemove && id === idToRemove ? <CardText color="red">
            {errorRemove}
        </CardText> : ''}

        <CardActions>
            {isModerator ?
                <RaisedButton
                    label="Remove working agreement"
                    onTouchTap={() =>
                            deleteWorkingAgreement(id, sprintId, onData, handlers, wrappedData,
                        )}
                />
                :
                ''
            }
        </CardActions>
    </Card>
);

WorkingAgreement.defaultProps = {
    errorRemove: '',
    idToRemove: '',
};

WorkingAgreement.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    sprintId: PropTypes.string.isRequired,
    deleteWorkingAgreement: PropTypes.func.isRequired,
    wrappedData: PropTypes.func.isRequired,
    onData: PropTypes.func.isRequired,
    isModerator: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    handlers: PropTypes.arrayOf(
        PropTypes.shape({
            subscriptionId: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    errorRemove: PropTypes.string,
    idToRemove: PropTypes.string,
};

export default WorkingAgreement;
