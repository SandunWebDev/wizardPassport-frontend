import { State, StateCreator } from 'zustand';

import log from '../../utilities/logger';

export const logger =
	<T extends State>(
		config: StateCreator<T, (args: () => void) => void>,
	): StateCreator<T> =>
	(set, get, api) =>
		config(
			(args) => {
				log.info('Action Fired', args);
				set(args);
				log.info('New State', get());
			},
			get,
			api,
		);
