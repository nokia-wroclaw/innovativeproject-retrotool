import React, { PropTypes } from 'react';
import {
    Dialog,
    FlatButton,
    TextField,
    Toggle,
} from 'material-ui';

const AddPost = ({
    onClose,
    addPost,
    open,
}) => {
    // @TODO: addPost()
    const actions = [
        <FlatButton
            label="Cancel"
            primary
            onTouchTap={onClose}
        />,
        <FlatButton
            label="Submit"
            primary
            onTouchTap={() => addPost() && onClose()}
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
            />
            <Toggle
                label="Show my name"
                defaultToggled
            />
        </Dialog>
    );
};

AddPost.propTypes = {
    addPost: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

AddPost.defaultPropTypes = {
    open: false,
};

export default AddPost;
