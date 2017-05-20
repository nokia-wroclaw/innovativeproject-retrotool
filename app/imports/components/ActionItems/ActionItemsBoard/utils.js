import moment from 'moment';
import _ from 'lodash';


const sorts = {
    oldestToNewest({ createdAt: a }, { createdAt: b }) {
        return moment(a).isAfter(b);
    },
    newestToOldest({ createdAt: a }, { createdAt: b }) {
        return moment(a).isBefore(b);
    },
};

export const getDefaultOptionValue = () => 'newestToOldest';

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
