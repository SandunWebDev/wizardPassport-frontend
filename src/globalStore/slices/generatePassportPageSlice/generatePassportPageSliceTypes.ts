// NOTE : These types defined in separate file to avoid circular dependency.

export interface GeneratePassportPageSlice {
	generatePassportPage: {
		state: {
			house: string;
		};
		actions: {
			setHouse: (house: string) => void;
		};
	};
}
