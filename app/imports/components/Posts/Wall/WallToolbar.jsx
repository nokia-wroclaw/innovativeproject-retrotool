import React, { PropTypes } from 'react';
import {
    SelectField,
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
            <SelectField
                value={selectedCategoryId}
                onChange={handleChangeSelectedCategory}
                floatingLabelText="Category"
                floatingLabelFixed
                hintText="Select category"
            >
                {categories.map(category =>
                    <MenuItem
                        key={category._id}
                        value={category._id}
                        primaryText={category.name}
                    />,
                )}
                {selectedCategoryId ?
                    <MenuItem
                        onTouchTap={(...args) => handleChangeSelectedCategory(...args)}
                        primaryText="Reset filter"
                    />
                    :
                    ''
                }
            </SelectField>
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
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

WallToolbar.defaultProps = {
    selectedCategoryId: '',
};

export default WallToolbar;
