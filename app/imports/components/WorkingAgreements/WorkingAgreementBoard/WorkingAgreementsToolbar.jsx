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
}) =>
    <Toolbar className="WAtoolbar">
        <ToolbarGroup className="WAtoolbarGroup">
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
    </Toolbar>
;

WorkingAgreementsToolbar.propTypes = {
    addWorkingAgreement: PropTypes.func.isRequired,
    isMember: PropTypes.bool.isRequired,
    isClosed: PropTypes.bool.isRequired,
};

export default WorkingAgreementsToolbar;
