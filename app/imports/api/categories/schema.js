import SimpleSchema from 'simpl-schema';

export const CategorySchema = new SimpleSchema({
    name: {
        type: String,
    },
    projectId: {
        type: String,
        optional: true,
    },
    color: {
        type: String,
    },
});

// method schemas
export const RemoveCategorySchema = new SimpleSchema({
    id: String,
});

export const AddCategorySchema = CategorySchema.pick('name', 'projectId');
