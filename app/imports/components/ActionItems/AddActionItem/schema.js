import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    startDate: {
        type: Date,
        defaultValue: new Date(),
    },
    endDate: {
        type: Date,
        defaultValue: new Date(),
        custom() {
            if (this.value < this.field('startDate').value) {
                return 'Start date is older than end date';
            }
            return false;
        },
    },
    assignee: {
        type: String,
    },
    text: {
        type: String,
        min: 3,
        max: 250,
    },
});
