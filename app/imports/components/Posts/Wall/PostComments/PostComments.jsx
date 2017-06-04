import React from 'react';
import PropTypes from 'prop-types';

import { CardText } from 'material-ui';
import ConfirmModal from '/imports/components/ConfirmModal';
import AddComment from './AddComment.jsx';
import Comment from './Comment.jsx';

class PostComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openConfirmModal: false,
        };
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
    }

    openConfirmModal(commentId) {
        this.setState({
            openConfirmModal: true,
            commentId,
        });
    }

    closeConfirmModal() {
        this.setState({
            openConfirmModal: false,
            id: undefined,
        });
    }

    render() {
        const {
            comments,
            addPostComment,
            errorAddPostComment,
            isMember,
            removeComment,
            ...props
        } = this.props;
        const {
            openConfirmModal,
            commentId,
        } = this.state;

        return (
            <CardText>
                {comments.map((comment) => {
                    const {
                        id,
                        text,
                        author,
                        createdAt,
                    } = comment;

                    return (
                        <Comment
                            key={id}
                            id={id}
                            text={text}
                            author={author}
                            createdAt={createdAt}
                            removeComment={this.openConfirmModal}
                            {...props}
                        />
                    );
                })}

                {openConfirmModal &&
                    <ConfirmModal
                        open={openConfirmModal}
                        title="Remove confirm"
                        text="Please, confirm"
                        onCancel={this.closeConfirmModal}
                        onConfirm={() => {
                            removeComment(commentId);
                            this.closeConfirmModal();
                        }}
                    />
                }

                {isMember &&
                    <AddComment
                        error={errorAddPostComment}
                        onSubmit={addPostComment}
                    />
                }
            </CardText>
        );
    }
}

PostComments.propTypes = {
    isMember: PropTypes.bool.isRequired,
    errorAddPostComment: PropTypes.instanceOf(Error),
    addPostComment: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            author: PropTypes.shape({
                name: PropTypes.string.isRequired,
                avatar: PropTypes.string.isRequired,
            }).isRequired,
            createdAt: PropTypes.instanceOf(Date).isRequired,
        }),
    ).isRequired,
};

PostComments.defaultProps = {
    errorAddPostComment: null,
};


export default PostComments;
