import {
	Draft,
	enableAllPlugins as enableAllImmerPlugins,
	produce,
} from 'immer';
import { GetState, SetState, State, StateCreator, StoreApi } from 'zustand';

// If wanna change types of built-in plugins used check "https://immerjs.github.io/immer/installation#pick-your-immer-version"
enableAllImmerPlugins();

export const immer =
	<
		T extends State,
		CustomSetState extends SetState<T>,
		CustomGetState extends GetState<T>,
		CustomStoreApi extends StoreApi<T>,
	>(
		config: StateCreator<
			T,
			(partial: ((draft: Draft<T>) => void) | T, replace?: boolean) => void,
			CustomGetState,
			CustomStoreApi
		>,
	): StateCreator<T, CustomSetState, CustomGetState, CustomStoreApi> =>
	(set, get, api) =>
		config(
			(partial, replace) => {
				const nextState =
					typeof partial === 'function'
						? produce(partial as (state: Draft<T>) => T)
						: partial;
				return set(nextState, replace);
			},
			get,
			api,
		);
