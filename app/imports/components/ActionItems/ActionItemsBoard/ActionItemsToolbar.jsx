import React from 'react';
import PropTypes from 'prop-types';
import {
    RaisedButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';

import RenderStatus from './RenderStatus.jsx';

const ActionItemsToolbar = ({
    addActionItem,
    isMember,
    isClosed,
    selectedState,
    onChangeCategory,
    hideButton,
}) => {
    const status = [
        {
            value: 'true',
            label: 'Open',
        },
        {
            value: 'false',
            label: 'Closed',
        },
        {
            value: 'all',
            label: 'Show All',
        },
    ];

    return (
        <Toolbar>
            <ToolbarGroup>
                <RenderStatus
                    status={status}
                    selectedState={selectedState}
                    onChangeCategory={onChangeCategory}
                />
            </ToolbarGroup>
            <ToolbarGroup>
                {isMember && !isClosed && !hideButton ?
                    <RaisedButton
                        label="Add action item"
                        onTouchTap={addActionItem}
                        primary
                    />
                    :
                    ''
                }
            </ToolbarGroup>
        </Toolbar>
    );
};

ActionItemsToolbar.defaultProps = {
    hideButton: false,
};

ActionItemsToolbar.propTypes = {
    addActionItem: PropTypes.func.isRequired,
    onChangeCategory: PropTypes.func.isRequired,
    isMember: PropTypes.bool.isRequired,
    isClosed: PropTypes.bool.isRequired,
    selectedState: PropTypes.string.isRequired,
    hideButton: PropTypes.bool,
};

export default ActionItemsToolbar;
