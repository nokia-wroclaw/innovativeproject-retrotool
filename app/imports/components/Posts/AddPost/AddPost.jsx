import React, { PropTypes } from 'react';
import {
    Dialog,
    FlatButton,
    TextField,
    Toggle,
} from 'material-ui';

// @TODO: addPost()

class AddPost extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.updatePostText = this.updatePostText.bind(this);
        this.changeShowAuthor = this.changeShowAuthor.bind(this);
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
        } = this.state;

        const {
            projectId,
        } = this.props;

        const {
            addPost,
            onClose,
        } = this.props;

        addPost({ text, showAuthor, projectId }, (error) => {
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


    render() {
        const {
            onClose,
            open,
        } = this.props;

        const {
            postText,
            showAuthor,
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
};

AddPost.defaultPropTypes = {
    open: false,
};

export default AddPost;
