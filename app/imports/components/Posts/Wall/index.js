import React from 'react';
import Wall from './Wall.jsx';

// @TODO: add categories
// @TODO: add posts

const categories = [
    { id: '1', name: 'All categories' },
    { id: '2', name: 'Some idea' },
    { id: '3', name: 'Another great idea' },
];

const posts = [
    { id: '1', text: 'lorem ipsum', showAuthor: false },
    { id: '2', text: 'lorem ipsum', showAuthor: false },
    { id: '3', text: 'lorem ipsum', showAuthor: false },
    { id: '4', text: 'lorem ipsum', showAuthor: false }
];

const WrapperWall = () => (
    <Wall
        addPost={() => {}}
        categories={categories}
        posts={posts}
    />
);

export default WrapperWall;
