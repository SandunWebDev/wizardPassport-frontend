import log from 'loglevel';

const { NODE_ENV, REACT_APP_FRONTEND_BASEURL, REACT_APP_BACKEND_BASEURL } =
	process.env;

const globalValues = {
	credentials: {},

	baseURLS: {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		FRONTEND_BASEURL: REACT_APP_FRONTEND_BASEURL,
		BACKEND_BASEURL: REACT_APP_BACKEND_BASEURL,
	},

	environment: {
		CURRENT_ENVIRONMENT: NODE_ENV,
		IS_DEVELOPMENT: NODE_ENV === 'development',
	},
};

export default globalValues;

// *****************************************************************
// Simple function to notify if critical env values are not passed.
function checkAllCriticalEnvValuesAvailable() {
	const criticalEnvValueList: string[] = [
		'REACT_APP_FRONTEND_BASEURL',
		'REACT_APP_BACKEND_BASEURL',
	];

	// eslint-disable-next-line sonarjs/no-empty-collection
	const isAllCriticalEnvValuesAvailable = criticalEnvValueList.every(
		(envValue) => envValue,
	);

	if (!isAllCriticalEnvValuesAvailable) {
		log.error('NOTE : SOME CRITICAL ENV VALUES ARE MISSING');
	}
}
checkAllCriticalEnvValuesAvailable();
