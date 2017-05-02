import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    startDate: {
        type: Date(),
    },
    endDate: {
        type: Date,
        defaultValue: new Date(),
        custom() {
            if (this.value < this.field('startDate').value) {
                return 'End date is bigger than start date';
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
