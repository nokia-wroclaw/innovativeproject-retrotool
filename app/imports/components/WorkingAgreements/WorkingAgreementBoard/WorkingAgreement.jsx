import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
    Card,
    CardActions,
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
}) => (
    <Card key={id}>
        <CardHeader
            title={text}
            subtitle={formatDate(date)}
        />

        <CardActions>
            {isModerator ?
                <RaisedButton
                    label="Remove working agreement"
                    onTouchTap={() => deleteWorkingAgreement(id)}
                />
                :
                ''
            }
        </CardActions>
    </Card>
);

WorkingAgreement.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    deleteWorkingAgreement: PropTypes.func.isRequired,
    isModerator: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
};

export default WorkingAgreement;
