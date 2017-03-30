import { Meteor } from 'meteor/meteor';
import { Categories } from './../Categories.js';

Meteor.publish('categories', function publishCategories() {
    return Categories.find();
});
