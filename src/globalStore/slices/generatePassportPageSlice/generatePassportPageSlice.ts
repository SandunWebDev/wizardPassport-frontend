import { StoreState, StoreSlice } from '../../globalStoreTypes';

import { GeneratePassportPageSlice } from './generatePassportPageSliceTypes';

export const sliceName = 'generatePassportPage';

const defaultSliceState = { inputtedPassportFormData: null };

const getSliceActions: StoreSlice<
	GeneratePassportPageSlice['generatePassportPage']['actions']
> = (set, get) => {
	return {
		setInputtedPassportFormData: (passportData) => {
			set((store: StoreState) => {
				store.generatePassportPage.state.inputtedPassportFormData =
					passportData;
			});
		},

		clearInputtedPassportFormData: () => {
			set((store: StoreState) => {
				store.generatePassportPage.state.inputtedPassportFormData = null;
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
