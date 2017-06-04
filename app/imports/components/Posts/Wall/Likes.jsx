import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatButton,
    LinearProgress,
} from 'material-ui';

import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import { blue500 } from 'material-ui/styles/colors';

import { styles } from './styles.js';

const Likes = ({
    id,
    likePost,
    removeLike,
    dislikePost,
    removeDislike,
    likes,
    dislikes,
    isLiked,
    isDisliked,
}) => (
    <div>
        {!isLiked ?
            <FlatButton
                icon={<ThumbUp />}
                label={likes}
                onTouchTap={() => likePost(id)}
            />
            :
            <FlatButton
                icon={<ThumbUp color={blue500} />}
                label={likes}
                onTouchTap={() => removeLike(id)}
            />
        }
        {!isDisliked ?
            <FlatButton
                icon={<ThumbDown />}
                label={dislikes}
                onTouchTap={() => dislikePost(id)}
            />
            :
            <FlatButton
                icon={<ThumbDown color={blue500} />}
                label={dislikes}
                onTouchTap={() => removeDislike(id)}
            />
        }
        {likes ?
            <LinearProgress
                mode="determinate"
                value={likes}
                max={likes + dislikes}
                style={styles.LinearProgress}
            />
            :
            ''
        }
    </div>
);

Likes.propTypes = {
    id: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    dislikePost: PropTypes.func.isRequired,
    removeDislike: PropTypes.func.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    isDisliked: PropTypes.bool.isRequired,
};

Likes.defaultProps = {
    canRemove: false,
    likes: 0,
    dislikes: 0,
    isLiked: false,
    isDisliked: false,
};

export default Likes;
