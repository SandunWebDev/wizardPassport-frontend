// NOTE : These types defined in separate file to avoid circular dependency.

import { SetState, GetState } from 'zustand';

import { GeneratePassportPageSlice } from './slices/generatePassportPageSlice/generatePassportPageSliceTypes';
import { UserPreferencesSlice } from './slices/userPreferencesSlice/userPreferencesSliceTypes';

// Type that contain "Full Structure" of the global store.
export type StoreState = UserPreferencesSlice & GeneratePassportPageSlice;

// Used in "createXXXXXXSlice()" function definitions.
// For example check "./slices/userPreferencesSlice/userPreferencesSlice.ts" ---> "createUserPreferencesSlice"
export type StoreSlice<T> = (
	set: SetState<StoreState>,
	get: GetState<StoreState>,
) => T;
