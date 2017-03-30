import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import { actions } from '/imports/api/posts';
import AddPost from './AddPost.jsx';

const composer = (props, onData) => {
    // @TODO subscribe categories...

    const { projectId } = props.router.params;

    onData(null, {
        addPost: actions.addPost,
        projectId,
        ...props,
    });
};

export default withRouter(
    composeWithTracker(
        composer,
    )(AddPost),
);
