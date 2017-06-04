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
    const projectHandler = Meteor.subscribe('singleProject', projectId);
    const categoriesHandler = Meteor.subscribe('categories', projectId);

    const userId = Meteor.userId();
    const canEditGlobalCategories = isAdmin();

    if (categoriesHandler.ready() && projectHandler.ready()) {
        const canEditProjectCategories = projectId && isProjectModerator(projectId, userId);

        const projectCategories = Categories.find({ projectId }).map(
            category => ({
                value: category._id,
                label: category.name,
                color: category.color,
            }),
        );
        const globalCategories = Categories.find({ projectId: { $exists: false } }).map(
            category => ({
                value: category._id,
                label: category.name,
                color: category.color,
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
