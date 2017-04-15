import React, { PropTypes } from 'react';

import {
    Card,
    CardText,
    FlatButton,
    TextField,
    Toggle,
} from 'material-ui';

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.updateText = this.updateText.bind(this);
        this.addComment = this.addComment.bind(this);
        this.changeAuthorVisibility = this.changeAuthorVisibility.bind(this);

        this.state = {
            text: '',
            showAuthor: true,
        };
    }

    updateText(e) {
        this.setState({
            text: e.target.value,
        });
    }

    changeAuthorVisibility() {
        this.setState({
            showAuthor: !this.state.showAuthor,
        });
    }

    addComment() {
        const {
            addPostComment,
            postId,
        } = this.props;

        const {
            text,
            showAuthor,
        } = this.state;

        addPostComment({ text, showAuthor, postId });

        this.setState({
            text: '',
            showAuthor: true,
        });
    }

    render() {
        const {
            text,
            showAuthor,
        } = this.state;

        const { postId } = this.props;

        return (
            <Card>
                <CardText>
                    <TextField
                        id={`${postId}-comment`}
                        floatingLabelText="Would you add something?"
                        value={text}
                        onChange={this.updateText}
                        fullWidth
                    />
                    <Toggle
                        id={`${postId}-showAuthor`}
                        label="Show my name"
                        defaultToggled={showAuthor}
                        onToggle={this.changeAuthorVisibility}
                    />
                    <FlatButton
                        label="Add comment"
                        onTouchTap={this.addComment}
                        primary
                    />
                </CardText>
            </Card>
        );
    }
}

AddComment.propTypes = {
    addPostComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
};

export default AddComment;
