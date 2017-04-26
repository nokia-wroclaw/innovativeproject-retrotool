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

const formatDate = date => moment(date).fromNow();

const WorkingAgreement = ({
    id,
    text,
    date,
    deleteWorkingAgreement,
    isModerator,
    errorRemove,
    idToRemove,
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
                    onTouchTap={() => deleteWorkingAgreement(id)}
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
    date: PropTypes.instanceOf(Date).isRequired,
    deleteWorkingAgreement: PropTypes.func.isRequired,
    isModerator: PropTypes.bool.isRequired,
    errorRemove: PropTypes.string,
    idToRemove: PropTypes.string,
};

export default WorkingAgreement;
