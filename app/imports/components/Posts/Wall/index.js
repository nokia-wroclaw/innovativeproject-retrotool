import React from 'react';
import Wall from './Wall.jsx';

// @TODO: add categories
// @TODO: add posts

const categories = [
    { id: '1', name: 'All categories' },
    { id: '2', name: 'Some idea' },
    { id: '3', name: 'Another great idea' },
];

const posts = [];

const WrapperWall = () => (
    <Wall
        addPost={() => {}}
        categories={categories}
        posts={posts}
    />
);

export default WrapperWall;
