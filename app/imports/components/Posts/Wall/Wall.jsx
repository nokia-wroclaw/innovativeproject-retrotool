import React from 'react';
import PropTypes from 'prop-types';
import ConfirmModal from '/imports/components/ConfirmModal';
import AddPost from '../AddPost';
import WallToolbar from './WallToolbar.jsx';
import Post from './Post.jsx';

import {
    getDefaultOptionValue,
    sort,
    sortOptions,
} from './utils.js';

class Wall extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeSelectedCategory = this.handleChangeSelectedCategory.bind(this);
        this.handleChangeSort = this.handleChangeSort.bind(this);
        this.showAddPostModal = this.showAddPostModal.bind(this);
        this.hideAddPostModal = this.hideAddPostModal.bind(this);
        this.addPost = this.addPost.bind(this);
        this.showRemovePostModal = this.showRemovePostModal.bind(this);
        this.hideRemovePostModal = this.hideRemovePostModal.bind(this);

        this.state = {
            selectedSortId: getDefaultOptionValue(),
            showAddPostModal: false,
            showAddRemoveModal: false,
            addPostError: null,
        };
    }

    handleChangeSelectedCategory(event, index, value) {
        this.setState({ selectedCategoryId: value });
    }

    handleChangeSort(event, index, value) {
        this.setState({ selectedSortId: value });
    }

    showAddPostModal() {
        this.setState({ showAddPostModal: true });
    }

    hideAddPostModal() {
        this.setState({
            showAddPostModal: false,
            addPostError: null,
        });
    }

    showRemovePostModal(postId) {
        this.setState({
            showAddRemoveModal: true,
            postId,
        });
    }

    hideRemovePostModal() {
        this.setState({
            showAddRemoveModal: false,
        });
    }

    addPost(doc) {
        const { sprintId } = this.props;
        this.props.addPost({ sprintId, ...doc }, (error) => {
            if (error) {
                this.setState({ addPostError: new Error(error.reason || error) });
                return;
            }
            this.hideAddPostModal();
        });
    }

    render() {
        const {
            addPostError,
            selectedCategoryId,
            showAddPostModal,
            showAddRemoveModal,
            selectedSortId,
            postId,
        } = this.state;

        const {
            categories,
            projectId,
            isProjectModeratorOrAdmin,
            removePost,
            likePost,
            removeLike,
            dislikePost,
            removeDislike,
            isSprintOpen,
            userId,
            isMember,
        } = this.props;

        const posts = sort(this.props.posts, selectedSortId);

        return (
            <div>
                <WallToolbar
                    selectedCategoryId={selectedCategoryId}
                    categories={categories}
                    addPost={this.showAddPostModal}
                    handleChangeSelectedCategory={this.handleChangeSelectedCategory}
                    handleChangeSort={this.handleChangeSort}
                    selectedSortId={selectedSortId}
                    sortOptions={sortOptions}
                    isSprintOpen={isSprintOpen}
                    isMember={isMember}
                />

                <div className="content-container">
                    {posts
                        .filter(
                            post => !selectedCategoryId || post.categoryId === selectedCategoryId,
                        )
                        .map(post =>
                            <Post
                                key={post._id}
                                id={post._id}
                                author={post.author}
                                categoryName={post.categoryName}
                                categoryColor={post.categoryColor}
                                text={post.text}
                                createdAt={post.createdAt}
                                projectId={projectId}
                                canRemove={isProjectModeratorOrAdmin}
                                removePost={this.showRemovePostModal}
                                likePost={likePost}
                                removeLike={removeLike}
                                dislikePost={dislikePost}
                                removeDislike={removeDislike}
                                likes={post.likes.length}
                                dislikes={post.dislikes.length}
                                isLiked={!!post.likes.find(like => like === userId)}
                                isDisliked={!!post.dislikes.find(dislike => dislike === userId)}
                                isMember={isMember}
                            />,
                        )
                    }
                </div>

                <ConfirmModal
                    title="Are you sure?"
                    text="You are removing post, please confirm"
                    open={showAddRemoveModal}
                    onCancel={this.hideRemovePostModal}
                    onConfirm={() => {
                        removePost(postId);
                        this.hideRemovePostModal();
                    }}
                />

                <AddPost
                    categories={categories}
                    open={showAddPostModal}
                    onSubmit={this.addPost}
                    error={addPostError}
                    onClose={this.hideAddPostModal}
                />
            </div>
        );
    }
}

Wall.propTypes = {
    addPost: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            author: PropTypes.shape({
                name: PropTypes.string,
                avatar: PropTypes.string,
            }),
            text: PropTypes.string.isRequired,
            createdAt: PropTypes.instanceOf(Date).isRequired,
        }),
    ).isRequired,
    sprintId: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    isProjectModeratorOrAdmin: PropTypes.bool.isRequired,
    removePost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    dislikePost: PropTypes.func.isRequired,
    removeDislike: PropTypes.func.isRequired,
    isSprintOpen: PropTypes.bool.isRequired,
    isMember: PropTypes.bool.isRequired,
};

Wall.defaultProps = {
    isProjectModeratorOrAdmin: false,
};

export default Wall;
