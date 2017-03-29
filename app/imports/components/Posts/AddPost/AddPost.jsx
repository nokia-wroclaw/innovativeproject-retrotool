import React, { PropTypes } from 'react';
import {
    Dialog,
    SelectField,
    FlatButton,
    MenuItem,
    TextField,
    Toggle,
} from 'material-ui';

class AddPost extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.updatePostText = this.updatePostText.bind(this);
        this.changeShowAuthor = this.changeShowAuthor.bind(this);
        this.changeSelectedCategory = this.changeSelectedCategory.bind(this);
        this.resetState = this.resetState.bind(this);

        this.state = {
            postText: '',
            showAuthor: true,
        };
    }

    onSubmit() {
        const {
            postText: text,
            showAuthor,
            selectedCategoryId: categoryId,
        } = this.state;

        const {
            projectId,
        } = this.props;

        const {
            addPost,
            onClose,
        } = this.props;

        addPost({ text, showAuthor, projectId, categoryId }, (error) => {
            if (error) {
                // @TODO show error modal
            }

            this.resetState();
            onClose();
        });
    }

    resetState() {
        this.setState({
            postText: '',
            showAuthor: true,
            selectedCategoryId: undefined,
        });
    }

    updatePostText(e) {
        this.setState({
            postText: e.target.value,
        });
    }

    changeShowAuthor() {
        const { showAuthor } = this.state;
        this.setState({ showAuthor: !showAuthor });
    }

    changeSelectedCategory(event, index, selectedCategoryId) {
        this.setState({ selectedCategoryId });
    }

    render() {
        const {
            onClose,
            open,
            categories,
        } = this.props;

        const {
            postText,
            showAuthor,
            selectedCategoryId,
        } = this.state;

        const actions = [
            <FlatButton
                label="Cancel"
                primary
                onTouchTap={onClose}
            />,
            <FlatButton
                label="Submit"
                primary
                onTouchTap={this.onSubmit}
            />,
        ];


        return (
            <Dialog
                title="Add post"
                actions={actions}
                open={open}
            >
                <TextField
                    floatingLabelText="What would you say?"
                    multiLine
                    rows={4}
                    fullWidth
                    value={postText}
                    onChange={this.updatePostText}
                />
                {categories.length !== 0 ?
                    <SelectField
                        value={selectedCategoryId}
                        onChange={this.changeSelectedCategory}
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
                    </SelectField>
                    :
                    ''
                }
                <Toggle
                    label="Show my name"
                    onToggle={this.changeShowAuthor}
                    defaultToggled={showAuthor}
                />
            </Dialog>
        );
    }
}

AddPost.propTypes = {
    projectId: PropTypes.string.isRequired,
    addPost: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

AddPost.defaultPropTypes = {
    open: false,
    categories: [],
};

export default AddPost;
