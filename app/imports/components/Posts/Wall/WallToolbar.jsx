import React, { PropTypes } from 'react';
import {
    DropDownMenu,
    MenuItem,
    RaisedButton,
    Toolbar,
    ToolbarGroup,
} from 'material-ui';

const WallToolbar = ({
    addPost,
    handleChangeSelectedCategory,
    selectedCategoryId,
    categories,
}) =>
    <Toolbar>
        <ToolbarGroup>
            <DropDownMenu
                value={selectedCategoryId}
                onChange={handleChangeSelectedCategory}
            >
                {categories.map(category =>
                    <MenuItem
                        key={category.id}
                        value={category.id}
                        primaryText={category.name}
                    />,
                )}
            </DropDownMenu>
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
    selectedCategoryId: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default WallToolbar;
