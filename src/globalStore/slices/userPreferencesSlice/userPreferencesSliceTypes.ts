// NOTE : These types defined in separate file to avoid circular dependency.

export interface UserPreferencesSlice {
	userPreferences: {
		state: {
			colorMode: string;
		};
		actions: {
			setColorMode: (colorMode: string) => void;
		};
	};
}
