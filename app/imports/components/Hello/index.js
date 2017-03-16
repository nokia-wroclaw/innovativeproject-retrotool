import Hello from './Hello.jsx';
import { Meteor } from 'meteor/meteor';

Meteor.subscribe('userData');

export default Hello;
