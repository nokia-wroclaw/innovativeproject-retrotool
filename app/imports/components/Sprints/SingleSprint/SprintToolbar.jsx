import React from 'react';
import PropTypes from 'prop-types';
import {
    RaisedButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';
import Lock from 'material-ui/svg-icons/action/lock';
import LockOutline from 'material-ui/svg-icons/action/lock-outline';
import LockOpen from 'material-ui/svg-icons/action/lock-open';

const SprintToolbar = ({
    sprint,
    closeSprint,
    canClose,
}) =>
    <Toolbar>
        <ToolbarGroup>
            {sprint.closed && <Lock />} {sprint.name}
        </ToolbarGroup>

        {canClose ? <ToolbarGroup>
            <RaisedButton
                icon={sprint.closed ? <LockOutline /> : <LockOpen />}
                label={sprint.closed ? 'Reopen sprint' : 'Close sprint'}
                onTouchTap={closeSprint}
                primary={!sprint.closed}
            />
        </ToolbarGroup> : ''}
    </Toolbar>
;

SprintToolbar.propTypes = {
    sprint: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    closeSprint: PropTypes.func.isRequired,
    canClose: PropTypes.bool.isRequired,
};

export default SprintToolbar;
