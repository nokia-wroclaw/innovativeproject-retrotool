import React from 'react';
import PropTypes from 'prop-types';
import {
    RaisedButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';

import RenderCategories from './RenderCategories.jsx';

const ActionItemsToolbar = ({
    addActionItem,
    isMember,
    isClosed,
    selectedState,
    onChangeCategory,
}) => {
    const categories = [
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
                Action items
            </ToolbarGroup>
            <ToolbarGroup>
                <RenderCategories
                    categories={categories}
                    selectedState={selectedState}
                    onChangeCategory={onChangeCategory}
                />
            </ToolbarGroup>
            <ToolbarGroup>
                {isMember && !isClosed ? <RaisedButton
                    label="Add action item"
                    onTouchTap={addActionItem}
                    primary
                /> : ''}
            </ToolbarGroup>
        </Toolbar>
    );
};

ActionItemsToolbar.propTypes = {
    addActionItem: PropTypes.func.isRequired,
    onChangeCategory: PropTypes.func.isRequired,
    isMember: PropTypes.bool.isRequired,
    isClosed: PropTypes.bool.isRequired,
    selectedState: PropTypes.string.isRequired,
};

export default ActionItemsToolbar;
