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

        const { categories } = props;
        const firstCategoryId = categories.length && categories[0].id;

        this.state = {
            selectedCategoryId: firstCategoryId,
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

                {posts.map(post =>
                    <Post
                        key={post.id}
                        id={post.id}
                        showAuthor={post.showAuthor}
                        author={post.author}
                        text={post.text}
                    />,
                )}

                <AddPost
                    open={showAddPostModal}
                    onClose={this.hideAddPostModal}
                />
            </div>
        );
    }
}

Wall.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({

        }),
    ).isRequired,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default Wall;
