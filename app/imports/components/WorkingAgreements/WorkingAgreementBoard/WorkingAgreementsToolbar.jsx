import React from 'react';
import PropTypes from 'prop-types';
import {
    RaisedButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';

const WorkingAgreementsToolbar = ({
    addWorkingAgreement,
    isMember,
}) =>
    <Toolbar>
        <ToolbarGroup>
            Working agreements
        </ToolbarGroup>
        <ToolbarGroup>
            {isMember ? <RaisedButton
                label="Add working agreement"
                onTouchTap={addWorkingAgreement}
                primary
            /> : ''}
        </ToolbarGroup>
    </Toolbar>
;

WorkingAgreementsToolbar.propTypes = {
    addWorkingAgreement: PropTypes.func.isRequired,
    isMember: PropTypes.bool.isRequired,
};

export default WorkingAgreementsToolbar;
