import SimpleSchema from 'simpl-schema';

const WorkingAgreementsSchema = new SimpleSchema({
    projectId: {
        type: String,
        defaultValue: '',
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
});

const romoveWorkingAgreementsSchema = new SimpleSchema({
    workingAgreementId: {
        type: String,
    },
});

export { WorkingAgreementsSchema, romoveWorkingAgreementsSchema };
