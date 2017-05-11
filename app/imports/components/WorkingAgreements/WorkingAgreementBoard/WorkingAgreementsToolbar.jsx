import React from 'react';
import PropTypes from 'prop-types';
import {
    RaisedButton,
    IconButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

import '../Style/WorkingAgreements.css';

class WorkingAgreementsToolbar extends React.Component {
    constructor(props) {
        super(props);

        this.hideToolbar = this.hideToolbar.bind(this);

        this.state = {
            toolbarClassName: 'WAtoolbar',
        };
    }

    hideToolbar() {
        this.setState({
            toolbarClassName: 'hideWAtoolbar',
        });
        //  localStorage.toolbarClassName = 'hideWAtoolbar';
    }

    render() {
        const {
            addWorkingAgreement,
            isMember,
            isClosed,
        } = this.props;

        const { toolbarClassName } = this.state;

        return (
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
                        onTouchTap={() => this.hideToolbar()}
                    >
                        <HardwareKeyboardArrowUp />
                    </IconButton>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

WorkingAgreementsToolbar.propTypes = {
    addWorkingAgreement: PropTypes.func.isRequired,
    isMember: PropTypes.bool.isRequired,
    isClosed: PropTypes.bool.isRequired,
};

export default WorkingAgreementsToolbar;
