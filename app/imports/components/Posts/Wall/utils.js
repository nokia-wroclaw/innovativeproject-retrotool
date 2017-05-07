import moment from 'moment';
import _ from 'lodash';

const sorts = {
    dateOldestToNewest({ createdAt: a }, { createdAt: b }) {
        return moment(a).isAfter(b);
    },
    dateNewestToOldest({ createdAt: a }, { createdAt: b }) {
        return moment(a).isBefore(b);
    },
    mostLiked({ likes: a }, { likes: b }) {
        return a < b;
    },
    mostDisliked({ likes: a }, { likes: b }) {
        return a > b;
    },
};

export const getDefaultOptionValue = () => 'dateNewestToOldest';

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
