import React from 'react';
import PropTypes from 'prop-types';
import {
    RaisedButton,
    IconButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import NavigationArrowDropDownCircle from 'material-ui/svg-icons/navigation/arrow-drop-down-circle';

import RenderStatus from './RenderStatus.jsx';

class ActionItemsToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.hideToolbar = this.hideToolbar.bind(this);
        this.showToolbar = this.showToolbar.bind(this);
    }

    hideToolbar() {
        localStorage.toolbarClassName = 'hideToolbar';
        localStorage.showToolbarIconClassName = 'showToolbarIcon';

        this.forceUpdate();
    }

    showToolbar() {
        localStorage.toolbarClassName = 'toolbar';
        localStorage.showToolbarIconClassName = 'hideToolbarIcon';

        this.forceUpdate();
    }

    render() {
        const {
            addActionItem,
            isMember,
            isClosed,
            selectedState,
            onChangeCategory,
        } = this.props;

        const {
            toolbarClassName,
            showToolbarIconClassName,
        } = localStorage;

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
            <div>
                <Toolbar className={toolbarClassName}>
                    <ToolbarGroup>
                        <RenderStatus
                            status={status}
                            selectedState={selectedState}
                            onChangeCategory={onChangeCategory}
                        />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        {isMember && !isClosed ?
                            <RaisedButton
                                label="Add action item"
                                onTouchTap={addActionItem}
                                primary
                            />
                            :
                            ''
                        }
                        <IconButton
                            tooltip="Hide tootlbar"
                            onTouchTap={this.hideToolbar}
                        >
                            <HardwareKeyboardArrowUp />
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>
                <div className={`toolbarIcon ${showToolbarIconClassName}`}>
                    <IconButton
                        tooltip="Show tootlbar"
                        onTouchTap={this.showToolbar}
                    >
                        <NavigationArrowDropDownCircle className={showToolbarIconClassName} />
                    </IconButton>
                </div>
            </div>
        );
    }
}

ActionItemsToolbar.propTypes = {
    addActionItem: PropTypes.func.isRequired,
    onChangeCategory: PropTypes.func.isRequired,
    isMember: PropTypes.bool.isRequired,
    isClosed: PropTypes.bool.isRequired,
    selectedState: PropTypes.string.isRequired,
};

export default ActionItemsToolbar;
