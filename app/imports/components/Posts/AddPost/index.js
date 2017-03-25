import { composeWithTracker } from 'react-komposer';
import { actions } from '/imports/api/posts';
import AddPost from './AddPost.jsx';

const composer = (props, onData) => {
    // @TODO subscribe categories...

    onData(null, {
        addPost: actions.addPost,
        ...props,
    });
};

export default composeWithTracker(
    composer,
)(AddPost);
