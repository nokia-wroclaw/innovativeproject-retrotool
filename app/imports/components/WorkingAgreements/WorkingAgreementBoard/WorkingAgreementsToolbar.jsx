import React from 'react';
import PropTypes from 'prop-types';
import {
    RaisedButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';

const WorkingAgreementsToolbar = ({
    addWorkingAgreement,
}) =>
    <Toolbar>
        <ToolbarGroup>
            Working agreements
        </ToolbarGroup>
        <ToolbarGroup>
            <RaisedButton
                label="Add working agreement"
                onTouchTap={addWorkingAgreement}
                primary
            />
        </ToolbarGroup>
    </Toolbar>
;

WorkingAgreementsToolbar.propTypes = {
    addWorkingAgreement: PropTypes.func.isRequired,
};

export default WorkingAgreementsToolbar;
