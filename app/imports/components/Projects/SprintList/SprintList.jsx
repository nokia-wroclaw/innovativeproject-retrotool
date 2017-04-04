import React, { PropTypes } from 'react';
import {
    List,
    ListItem,
} from 'material-ui';

const SprintList = ({
    sprints,
}) => (
    <List>
        {sprints.map(({ _id, name }) => (
            <ListItem
                key={_id}
                primaryText={name}
            />
        ))}
    </List>
);

SprintList.propTypes = {
    sprints: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default SprintList;
