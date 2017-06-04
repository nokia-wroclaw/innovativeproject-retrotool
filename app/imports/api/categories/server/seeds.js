import { Meteor } from 'meteor/meteor';
import { Categories } from './../Categories.js';
import selectedColors from './../colors.js';

if (Meteor.isServer) {
    const { skipSeeds } = Meteor.settings;
    if (skipSeeds) {
        return;
    }

    const categories = [
        'Idea',
        'Code Improvement',
        'Random',
    ];

    if (Categories.find().count() === 0) {
        categories.forEach((categoryName, index) =>
            Categories.insert({
                name: categoryName,
                color: selectedColors[index % selectedColors.length],
            }),
        );
    }
}
