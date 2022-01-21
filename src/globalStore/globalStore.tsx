// SIDE-NOTE : This is similar to Redux Global State. (State + Actions + Reducers) But just simple.
//        Wherever you want to consume this state, Just use this "useStore" hook.

import pipe from 'ramda/es/pipe';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { undoMiddleware, UndoState } from 'zundo';
import create, { StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';

import globalValues from '../configs/globalValues';

import { customizedPersist } from './customMiddleware/customizedPersist';
import { immer } from './customMiddleware/immer';
import { logger } from './customMiddleware/logger';
import { StoreState } from './globalStoreTypes';
import {
	createGeneratePassportPageSlice,
	createUserPreferencesSlice,
} from './slices';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const createStoreWithMiddleware = pipe(
	logger,
	immer, // Since we are using immer as custom middleware, We can safely and easily change state value directly. (https://github.com/pmndrs/zustand#middleware)
	devtools, // Attaching Zustand Store into Redux DevTools.
	undoMiddleware, // Ability to Undo and Redo State Actions. (https://github.com/charkour/zundo)
	customizedPersist, // Pre-Configured, Original Persist Middleware.
	create,
) as typeof create;

// SIDE-NOTE: In here "& UndoState" part is for "zundo" middleware.
export const useStore = createStoreWithMiddleware<StoreState & UndoState>(
	(set, get) => ({
		// export const useStore = create<StoreState>((set, get) => ({
		...createUserPreferencesSlice(set, get),
		...createGeneratePassportPageSlice(set, get),
	}),
);

if (globalValues.environment.IS_DEVELOPMENT) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type ZustandStore = StoreApi<Record<string | number | symbol, any>>;

	// Ability to Explore Store in React Dev Tools Panel. (https://github.com/beerose/simple-zustand-devtools)
	mountStoreDevtool('Zustand Store', useStore as unknown as ZustandStore);
}
