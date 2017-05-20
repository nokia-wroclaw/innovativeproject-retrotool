import React from 'react';
import PropTypes from 'prop-types';
import {
    RaisedButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';

import SortSelect from '/imports/components/Posts/Wall/SortSelect.jsx';


const WorkingAgreementsToolbar = ({
    addWorkingAgreement,
    isMember,
    isClosed,
    hideButton,
    handleChangeSort,
    selectedSortId,
    sortOptions,
}) =>
    <Toolbar>
        <ToolbarGroup>
            <SortSelect
                onChange={handleChangeSort}
                selectedId={selectedSortId}
                options={sortOptions}
            />
        </ToolbarGroup>
        <ToolbarGroup>
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
    selectedSortId: '',
};

WorkingAgreementsToolbar.propTypes = {
    addWorkingAgreement: PropTypes.func.isRequired,
    isMember: PropTypes.bool.isRequired,
    isClosed: PropTypes.bool.isRequired,
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

export default WorkingAgreementsToolbar;
