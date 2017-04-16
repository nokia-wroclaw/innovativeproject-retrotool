import React, { PropTypes } from 'react';
import {
    RaisedButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';

const SprintToolbar = ({
sprint,
closeSprint,
isModerator,
}) =>
    <Toolbar>
        <ToolbarGroup>
            {sprint.name} {sprint.closed ? ' - closed' : ''}
        </ToolbarGroup>

        {isModerator ? <ToolbarGroup>
            <RaisedButton
                label={!sprint.closed ? 'Close sprint' : 'Open sprint'}
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
    isModerator: PropTypes.bool.isRequired,
};

export default SprintToolbar;
