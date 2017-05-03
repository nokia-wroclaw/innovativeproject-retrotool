import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    closeMessage: {
        type: String,
        max: 250,
        defaultValue: '',
    },
});
