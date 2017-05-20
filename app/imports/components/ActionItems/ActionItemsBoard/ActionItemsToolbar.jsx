import React from 'react';
import PropTypes from 'prop-types';
import {
    RaisedButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';

import SortSelect from '/imports/components/Posts/Wall/SortSelect.jsx';
import RenderStatus from './RenderStatus.jsx';

const ActionItemsToolbar = ({
    addActionItem,
    isMember,
    isClosed,
    selectedState,
    onChangeCategory,
    handleChangeSort,
    selectedSortId,
    sortOptions,
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
                <SortSelect
                    onChange={handleChangeSort}
                    selectedId={selectedSortId}
                    options={sortOptions}
                />
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
    selectedSortId: '',
};

ActionItemsToolbar.propTypes = {
    addActionItem: PropTypes.func.isRequired,
    onChangeCategory: PropTypes.func.isRequired,
    isMember: PropTypes.bool.isRequired,
    isClosed: PropTypes.bool.isRequired,
    selectedState: PropTypes.string.isRequired,
    handleChangeSort: PropTypes.func.isRequired,
    selectedSortId: PropTypes.string.isRequired,
    sortOptions: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
    hideButton: PropTypes.bool,
};

export default ActionItemsToolbar;
