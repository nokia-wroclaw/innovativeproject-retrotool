import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
    Card,
    CardActions,
    CardTitle,
    CardText,
    RaisedButton,
} from 'material-ui';

const formatDate = date => moment(date).format('MMMM Do YYYY, h:mm:ss a');

const WorkingAgreement = ({
    id,
    text,
    date,
}) => (
    <Card key={id}>
        <CardTitle title={formatDate(date)} />
        <CardText>
            {text}
        </CardText>

        <CardActions>
            <RaisedButton
                label="Remove working agreement"
            />
        </CardActions>

    </Card>
);

WorkingAgreement.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
};

export default WorkingAgreement;
