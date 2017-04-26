import SimpleSchema from 'simpl-schema';

const WorkingAgreementsSchema = new SimpleSchema({
    projectId: {
        type: String,
    },
    text: {
        type: String,
    },
    date: {
        type: Date,
        defaultValue: new Date(),
    },
});

export { WorkingAgreementsSchema };
