import moment from 'moment';
import _ from 'lodash';


const sorts = {
    createDateOldestToNewest({ createdAt: a }, { createdAt: b }) {
        return moment(a).isAfter(b);
    },
    createDateNewestToOldest({ createdAt: a }, { createdAt: b }) {
        return moment(a).isBefore(b);
    },
    validityDateOldestToNewest({ date: a }, { date: b }) {
        return moment(a).isAfter(b);
    },
    validityDateNewestToOldest({ date: a }, { date: b }) {
        return moment(a).isBefore(b);
    },
};

export const getDefaultOptionValue = () => 'validityDateNewestToOldest';

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
