import React from 'react';
import PropTypes from 'prop-types';
import {
    RaisedButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';
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
    isSprintOpen,
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
        {isSprintOpen &&
            <ToolbarGroup>
                <RaisedButton
                    icon={<Add />}
                    label="Add Post"
                    onTouchTap={addPost}
                    primary
                />
            </ToolbarGroup>
        }
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
    isSprintOpen: PropTypes.bool.isRequired,
};

WallToolbar.defaultProps = {
    selectedCategoryId: '',
    selectedSortId: '',
    isSprintOpen: false,
};

export default WallToolbar;
