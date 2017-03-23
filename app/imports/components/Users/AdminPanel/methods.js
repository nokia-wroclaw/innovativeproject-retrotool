import { Meteor } from 'meteor/meteor';

export const isAdmin = () => {
    console.log('in funcition isAdmin');

    const handler = Meteor.subscribe('userData');

    if (handler.ready()) {
        const admin = Meteor.users.findOne({}).isAdmin;
        console.log('in composer', admin);


        console.log('IN HELPERS');
        if (typeof admin !== 'undefined') {
            if (admin) {
                console.log('is admin', admin);
                return true;
            }
            console.log('is not admin', admin);
            return false;
        }
    }
    return 'loading';
};
