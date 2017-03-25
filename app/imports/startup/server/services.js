import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

import _ from 'lodash';

const addGithubConfiguration = () => {
    const service = 'github';
    const github = _.get(Meteor.settings, `services[${service}]`, null);
    if (!github) {
        throw new Meteor.Error(
            'missing-settings-github',
            'You\'ve tried to add github configuration, but none was found.',
        );
    }

    const {
        clientId,
        clientSecret: secret,
    } = github;

    ServiceConfiguration.configurations.upsert({
        service,
    }, {
        service,
        clientId,
        secret,
        loginStyle: 'popup',
    });
};

const addServicesConfiguration = () => {
    // @TODO check before add if configuration found
    addGithubConfiguration();
};

export default addServicesConfiguration;

