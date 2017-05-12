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

class WorkingAgreementsToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.hideToolbar = this.hideToolbar.bind(this);
        this.showToolbar = this.showToolbar.bind(this);

        this.state = {
            toolbarClassName: 'toolbar',
            showToolbarIconClassName: 'hideToolbarIcon',
        };
    }

    hideToolbar() {
        this.setState({
            toolbarClassName: 'hideToolbar',
            showToolbarIconClassName: 'showToolbarIcon',
        });
        //  localStorage.toolbarClassName = 'hideToolbar';
    }

    showToolbar() {
        this.setState({
            toolbarClassName: 'toolbar',
            showToolbarIconClassName: 'hideToolbarIcon',
        });
        //  localStorage.toolbarClassName = 'toolbar';
    }

    render() {
        const {
            addWorkingAgreement,
            isMember,
            isClosed,
        } = this.props;

        const {
            toolbarClassName,
            showToolbarIconClassName,
        } = this.state;

        return (
            <div>
                <Toolbar className={toolbarClassName}>
                    <ToolbarGroup>
                        {isMember && !isClosed ?
                            <RaisedButton
                                label="Add working agreement"
                                onTouchTap={addWorkingAgreement}
                                primary
                            />
                            :
                            ''
                        }
                    </ToolbarGroup>
                    <ToolbarGroup>
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

WorkingAgreementsToolbar.propTypes = {
    addWorkingAgreement: PropTypes.func.isRequired,
    isMember: PropTypes.bool.isRequired,
    isClosed: PropTypes.bool.isRequired,
};

export default WorkingAgreementsToolbar;
