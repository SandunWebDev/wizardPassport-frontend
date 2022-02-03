import { TPassportData } from '../../../commonTypes/passport';

// NOTE : These types defined in separate file to avoid circular dependency.

export interface GeneratePassportPageSlice {
	generatePassportPage: {
		state: {
			inputtedPassportFormData: TPassportData | null;
		};
		actions: {
			setInputtedPassportFormData: (passportData: TPassportData) => void;
			clearInputtedPassportFormData: () => void;
		};
	};
}
