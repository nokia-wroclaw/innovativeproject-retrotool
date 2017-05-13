import React from 'react';
import PropTypes from 'prop-types';
import {
    RaisedButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';

import '../Style/WorkingAgreements.css';

const WorkingAgreementsToolbar = ({
    addWorkingAgreement,
    isMember,
    isClosed,
    hideButton,
}) =>
    <Toolbar className="WAtoolbar">
        <ToolbarGroup className="WAtoolbarGroup">
            {isMember && !isClosed && !hideButton ?
                <RaisedButton
                    label="Add working agreement"
                    onTouchTap={addWorkingAgreement}
                    primary
                />
                :
                ''
            }
        </ToolbarGroup>
    </Toolbar>
;

WorkingAgreementsToolbar.defaultProps = {
    hideButton: false,
};

WorkingAgreementsToolbar.propTypes = {
    addWorkingAgreement: PropTypes.func.isRequired,
    isMember: PropTypes.bool.isRequired,
    isClosed: PropTypes.bool.isRequired,
    hideButton: PropTypes.bool,
};

export default WorkingAgreementsToolbar;
