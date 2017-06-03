import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import {
    Categories,
    actions,
} from '/imports/api/categories';
import { isAdmin } from '/imports/api/users';
import { isProjectModerator } from '/imports/api/projects';
import CategoryManager from './CategoryManager.jsx';

const composer = ({ params: { projectId = '' } }, onData) => {
    const categoriesHandler = Meteor.subscribe('categories', projectId);

    const userId = Meteor.userId();
    const canEditGlobalCategories = isAdmin();
    const canEditProjectCategories = projectId && isProjectModerator(projectId, userId);

    if (categoriesHandler.ready()) {
        const projectCategories = Categories.find({ projectId }).map(
            category => ({
                value: category._id,
                label: category.name,
            }),
        );
        const globalCategories = Categories.find({ projectId: { $exists: false } }).map(
            category => ({
                value: category._id,
                label: category.name,
            }),
        );

        onData(null, {
            projectId,
            addPostCategory: actions.addPostCategory,
            removePostCategory: actions.removePostCategory,
            canEditGlobalCategories,
            canEditProjectCategories,
            projectCategories,
            globalCategories,
        });
    }
};

export default withRouter(
    composeWithTracker(composer)(CategoryManager),
);
