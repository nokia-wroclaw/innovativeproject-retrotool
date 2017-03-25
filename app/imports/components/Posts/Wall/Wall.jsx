import React, { PropTypes } from 'react';

import WallToolbar from './WallToolbar.jsx';
import Post from './Post.jsx';

class Wall extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeSelectedCategory = this.handleChangeSelectedCategory.bind(this);

        const { categories } = props;
        const firstCategoryId = categories.length && categories[0].id;

        this.state = {
            selectedCategoryId: firstCategoryId,
        };
    }

    handleChangeSelectedCategory(event, index, value) {
        this.setState({ selectedCategoryId: value });
    }

    render() {
        const { selectedCategoryId } = this.state;
        const {
            posts,
            categories,
            addPost,
        } = this.props;

        return (
            <div>
                <WallToolbar
                    selectedCategoryId={selectedCategoryId}
                    categories={categories}
                    addPost={addPost}
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
            </div>
        );
    }
}

Wall.propTypes = {
    addPost: PropTypes.func.isRequired,
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
