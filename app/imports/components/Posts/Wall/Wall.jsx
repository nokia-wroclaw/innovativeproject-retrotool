import React, { PropTypes } from 'react';

import AddPost from '../AddPost';
import WallToolbar from './WallToolbar.jsx';
import Post from './Post.jsx';

// @TODO add category name to `Post` component
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
            posts,
            categories,
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
                        />,
                    )
                }

                <AddPost
                    open={showAddPostModal}
                    onClose={this.hideAddPostModal}
                    categories={categories}
                />
            </div>
        );
    }
}

Wall.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            author: PropTypes.shape({
                name: PropTypes.string,
                avatar: PropTypes.string,
            }),
            text: PropTypes.string.isRequired,
        }),
    ).isRequired,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default Wall;
