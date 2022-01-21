import lodash from 'lodash';
import { persist } from 'zustand/middleware';

// NOTE: We are manually wrapping "persist" middleware, instead of directly passing middleware into middleware array list. Because we have to pass some config details into it.
//       So in here we wrap middleware with necessary config data, and export it to be used in middleware list.
//
//       For more info on middleware usage check "https://github.com/pmndrs/zustand/wiki/Persisting-the-store's-data"

// TODO :  Couldn't solve specific working/suitable types for this yet. So currently using any type. Need to figure out specific types to work with middleware system.

/* eslint-disable @typescript-eslint/no-explicit-any */
export const customizedPersist = (config: any) =>
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
	persist(config, {
		name: 'wizardPassport',
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		merge: (persistedState, currentState) => {
			// SIDE-NOTE: Since normally serialization don't serialize functions "actions" functions are not persisted.
			//            So when rehydrating actions are missing from store slices. To avoid that we do custom merging here.

			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			const actionPaths = Object.keys(persistedState).map(
				(path) => `${path}.actions`,
			);
			const actionPathsRemovedPersistedState = lodash.omit(
				persistedState,
				actionPaths,
			);

			return lodash.merge({}, currentState, actionPathsRemovedPersistedState);
		},
	});
