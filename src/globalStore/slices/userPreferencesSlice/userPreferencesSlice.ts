import { StoreState, StoreSlice } from '../../globalStoreTypes';

import { UserPreferencesSlice } from './userPreferencesSliceTypes';

export const sliceName = 'userPreferences';

const defaultSliceState = { colorMode: 'light' };

const getSliceActions: StoreSlice<
	UserPreferencesSlice['userPreferences']['actions']
> = (set, get) => {
	return {
		setColorMode: (colorMode) => {
			set((store: StoreState) => ({
				...store,
				userPreferences: {
					...store.userPreferences,
					state: {
						colorMode,
					},
				},
			}));
		},
	};
};

export const createUserPreferencesSlice: StoreSlice<UserPreferencesSlice> = (
	set,
	get,
) => ({
	userPreferences: {
		state: defaultSliceState,
		actions: getSliceActions(set, get),
	},
});
