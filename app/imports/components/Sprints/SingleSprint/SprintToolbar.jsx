import React, { PropTypes } from 'react';
import {
    RaisedButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';

const SprintToolbar = ({
sprint,
closeSprint,
canClose,
}) =>
    <Toolbar>
        <ToolbarGroup>
            {sprint.name} {sprint.closed ? ' - closed' : ''}
        </ToolbarGroup>

        {canClose ? <ToolbarGroup>
            <RaisedButton
                label={!sprint.closed ? 'Close sprint' : 'Reopen sprint'}
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
