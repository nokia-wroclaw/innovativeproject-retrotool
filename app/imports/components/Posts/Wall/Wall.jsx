import React, { PropTypes } from 'react';

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
        this.showAddPostModal = this.showAddPostModal.bind(this);
        this.hideAddPostModal = this.hideAddPostModal.bind(this);
        this.handleChangeSort = this.handleChangeSort.bind(this);

        this.state = {
            showAddPostModal: false,
            selectedSortId: getDefaultOptionValue(),
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
        this.setState({ showAddPostModal: false });
    }

    render() {
        const {
            selectedCategoryId,
            showAddPostModal,
            selectedSortId,
        } = this.state;

        const {
            addPost,
            categories,
            sprintId,
            projectId,
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
