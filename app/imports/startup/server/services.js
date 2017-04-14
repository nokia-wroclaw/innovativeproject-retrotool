import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

import _ from 'lodash';

const addServiceConfiguration = (serviceName) => {
    const service = _.get(Meteor.settings, `services[${serviceName}]`, null);
    if (!service) {
        throw new Meteor.Error(
            `missing-settings-${serviceName}`,
            `You've tried to add ${serviceName} configuration, but none was found.`,
        );
    }

    const {
        clientId,
        clientSecret: secret,
    } = service;

    ServiceConfiguration.configurations.upsert({
        serviceName,
    }, {
        serviceName,
        clientId,
        secret,
        loginStyle: 'redirect',
    });
};

const addServicesConfiguration = () => {
    const { services } = Meteor.settings;
    const servicesList = _.keys(services);
    servicesList.forEach(serviceName =>
        addServiceConfiguration(serviceName),
    );
};

export default addServicesConfiguration;

