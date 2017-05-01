import React from 'react';
import PropTypes from 'prop-types';
import {
    RaisedButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';

const ActionItemsToolbar = ({
    addActionItem,
    isMember,
    isClosed,
}) =>
    <Toolbar>
        <ToolbarGroup>
            Action items
        </ToolbarGroup>
        <ToolbarGroup>
            {isMember && !isClosed ? <RaisedButton
                label="Add action item"
                onTouchTap={addActionItem}
                primary
            /> : ''}
        </ToolbarGroup>
    </Toolbar>
;

ActionItemsToolbar.propTypes = {
    addActionItem: PropTypes.func.isRequired,
    isMember: PropTypes.bool.isRequired,
    isClosed: PropTypes.bool.isRequired,
};

export default ActionItemsToolbar;
