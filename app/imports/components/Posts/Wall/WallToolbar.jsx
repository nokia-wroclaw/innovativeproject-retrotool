import React, { PropTypes } from 'react';
import {
    RaisedButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';

import CategorySelect from './CategorySelect.jsx';
import SortSelect from './SortSelect.jsx';

const WallToolbar = ({
    addPost,
    handleChangeSelectedCategory,
    selectedCategoryId,
    categories,
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
    handleChangeSort: PropTypes.func.isRequired,
    selectedSortId: PropTypes.string.isRequired,
    sortOptions: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

WallToolbar.defaultProps = {
    selectedCategoryId: '',
    selectedSortId: '',
};

export default WallToolbar;
