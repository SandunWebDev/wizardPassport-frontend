const { NODE_ENV } = process.env;

const globalValues = {
	credentials: {},

	baseURLS: {},

	environment: {
		CURRENT_ENVIRONMENT: NODE_ENV,
		IS_DEVELOPMENT: NODE_ENV === 'development',
	},
};

export default globalValues;

// *****************************************************************
// Simple function to notify if critical env values are not passed.
function checkAllCriticalEnvValuesAvailable() {
	const criticalEnvValueList: string[] = [];

	// eslint-disable-next-line sonarjs/no-empty-collection
	const isAllCriticalEnvValuesAvailable = criticalEnvValueList.every(
		(envValue) => envValue,
	);

	if (!isAllCriticalEnvValuesAvailable) {
		console.error('NOTE : SOME CRITICAL ENV VALUES ARE MISSING');
	}
}
checkAllCriticalEnvValuesAvailable();
