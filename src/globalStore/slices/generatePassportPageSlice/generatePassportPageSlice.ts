import { StoreState, StoreSlice } from '../../globalStoreTypes';

import { GeneratePassportPageSlice } from './generatePassportPageSliceTypes';

export const sliceName = 'generatePassportPage';

const defaultSliceState = { house: '' };

const getSliceActions: StoreSlice<
	GeneratePassportPageSlice['generatePassportPage']['actions']
> = (set, get) => {
	return {
		setHouse: (house) => {
			set((store: StoreState) => {
				store.generatePassportPage.state.house = house;
			});
		},
	};
};

export const createGeneratePassportPageSlice: StoreSlice<
	GeneratePassportPageSlice
> = (set, get) => ({
	generatePassportPage: {
		state: defaultSliceState,
		actions: getSliceActions(set, get),
	},
});
