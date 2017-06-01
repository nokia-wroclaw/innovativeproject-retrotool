import SimpleSchema from 'simpl-schema';

const WorkingAgreementsSchema = new SimpleSchema({
    projectId: {
        type: String,
    },
    sprintId: {
        type: String,
    },
    text: {
        type: String,
    },
    date: {
        type: Date,
        defaultValue: new Date(),
    },
    createdAt: {
        type: Date,
        defaultValue: new Date(),
    },
});

const AddWorkingAgreementsSchema = WorkingAgreementsSchema.pick('sprintId', 'text', 'date');

const RemoveWorkingAgreementsSchema = new SimpleSchema({
    workingAgreementId: {
        type: String,
    },
});

export {
    WorkingAgreementsSchema,
    AddWorkingAgreementsSchema,
    RemoveWorkingAgreementsSchema,
};
