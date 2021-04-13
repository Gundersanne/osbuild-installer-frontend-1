import ReducerRegistry from '@redhat-cloud-services/frontend-components-utilities/files/ReducerRegistry';
import promiseMiddleware from 'redux-promise-middleware';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';

import { composeReducer } from './reducers/composes';

let registry;

export function init (store = {}, ...middleware) {
    if (registry) {
        throw new Error('store already initialized');
    }

    registry = new ReducerRegistry(store, [
        promiseMiddleware,
        ...middleware
    ]);

    registry.register({
        composes: composeReducer,
        notifications: notificationsReducer,
    });

    return registry;
}

export function getStore () {
    return registry.getStore();
}

export function register (...args) {
    return registry.register(...args);
}

/* added for testing purposes only */
export function clearStore() {
    registry = undefined;
}
