import moment from 'moment';
import _ from 'lodash';


const sorts = {
    createDateOldestToNewest({ createdAt: a }, { createdAt: b }) {
        return moment(a).isAfter(b);
    },
    createDateNewestToOldest({ createdAt: a }, { createdAt: b }) {
        return moment(a).isBefore(b);
    },
    startDateOldestToNewest({ startDate: a }, { startDate: b }) {
        return moment(a).isAfter(b);
    },
    startDateNewestToOldest({ startDate: a }, { startDate: b }) {
        return moment(a).isBefore(b);
    },
    latestDeadline({ endDate: a }, { endDate: b }) {
        return moment(a).isAfter(b);
    },
    earliestDeadline({ endDate: a }, { endDate: b }) {
        return moment(a).isBefore(b);
    },
};

export const getDefaultOptionValue = () => 'earliestDeadline';

export const sortOptions = _.keys(sorts)
    .map(option =>
        ({
            value: option,
            label: _.startCase(option),
        }),
    );

export const sort = (data, key) => {
    if (key) {
        return data.sort(sorts[key]);
    }
    return data;
};
