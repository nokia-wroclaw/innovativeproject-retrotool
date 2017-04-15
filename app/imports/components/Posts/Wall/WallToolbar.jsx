import React, { PropTypes } from 'react';
import {
    RaisedButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';

import CategorySelect from './CategorySelect.jsx';

const WallToolbar = ({
    addPost,
    handleChangeSelectedCategory,
    selectedCategoryId,
    categories,
}) =>
    <Toolbar>
        <ToolbarGroup>
            <CategorySelect
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                handleChangeSelectedCategory={handleChangeSelectedCategory}
            />
        </ToolbarGroup>
        <ToolbarGroup>
            <RaisedButton
                label="Add Post"
                onTouchTap={addPost}
                primary
            />
        </ToolbarGroup>
    </Toolbar>
;

WallToolbar.propTypes = {
    addPost: PropTypes.func.isRequired,
    handleChangeSelectedCategory: PropTypes.func.isRequired,
    selectedCategoryId: PropTypes.string,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

WallToolbar.defaultProps = {
    selectedCategoryId: '',
};

export default WallToolbar;
