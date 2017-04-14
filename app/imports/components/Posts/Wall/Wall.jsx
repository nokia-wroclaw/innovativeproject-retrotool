import React, { PropTypes } from 'react';

import AddPost from '../AddPost';
import WallToolbar from './WallToolbar.jsx';
import Post from './Post.jsx';

class Wall extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeSelectedCategory = this.handleChangeSelectedCategory.bind(this);
        this.showAddPostModal = this.showAddPostModal.bind(this);
        this.hideAddPostModal = this.hideAddPostModal.bind(this);

        this.state = {
            showAddPostModal: false,
        };
    }

    handleChangeSelectedCategory(event, index, value) {
        this.setState({ selectedCategoryId: value });
    }

    showAddPostModal() {
        this.setState({ showAddPostModal: true });
    }

    hideAddPostModal() {
        this.setState({ showAddPostModal: false });
    }

    render() {
        const {
            selectedCategoryId,
            showAddPostModal,
        } = this.state;

        const {
            addPost,
            categories,
            posts,
            sprintId,
            projectId,
        } = this.props;

        return (
            <div>
                <WallToolbar
                    selectedCategoryId={selectedCategoryId}
                    categories={categories}
                    addPost={this.showAddPostModal}
                    handleChangeSelectedCategory={this.handleChangeSelectedCategory}
                />

                {posts
                    .filter(post => !selectedCategoryId || post.categoryId === selectedCategoryId)
                    .map(post =>
                        <Post
                            key={post._id}
                            id={post._id}
                            author={post.author}
                            text={post.text}
                            createdAt={post.createdAt}
                            projectId={projectId}
                        />,
                    )
                }

                <AddPost
                    sprintId={sprintId}
                    addPost={addPost}
                    open={showAddPostModal}
                    onClose={this.hideAddPostModal}
                    categories={categories}
                />
            </div>
        );
    }
}

Wall.propTypes = {
    addPost: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
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
};

export default Wall;
