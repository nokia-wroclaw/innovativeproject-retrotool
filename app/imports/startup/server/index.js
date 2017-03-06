import { Meteor } from 'meteor/meteor';
import addServicesConfiguration from './services.js';

Meteor.startup(() => {
    addServicesConfiguration();
});
