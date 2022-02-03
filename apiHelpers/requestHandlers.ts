type TStatusTypes = 'success' | 'fail'; // For errors use "apiError()" function instead.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TAnyData = string | number | Record<string, unknown> | Array<any>;

type TApiResArgs = {
	code?: number;
	status?: TStatusTypes;
	success?: boolean;
	data?: TAnyData;
	description?: string;
	meta?: TAnyData;
};
// Helper function to send API Response in pre-defined structure.
export function apiRes(options: TApiResArgs) {
	const { code = 200, data = '', description = '', meta = '' } = options;
	let { status, success } = options;

	// Sensible defaults for "status" value.
	if (code === 200 && !status) {
		status = 'success';
	} else {
		status = 'fail';
	}

	// Sensible defaults for "success" value.
	if (code === 200 && !success) {
		success = true;
	} else {
		status = 'fail';
	}

	return { code, status, data, description, meta };
}

type TApiErrorArgs = {
	code?: number;
	data?: TAnyData;
	description?: string;
	meta?: TAnyData;
	errorObj?: Error;
};

// Helper function to send API Error Response in pre-defined structure.
export function apiError(options: TApiErrorArgs) {
	const { code = 400, data = '', meta = '', errorObj } = options;

	let { description } = options;

	// Sensible defaults.
	if (errorObj) {
		const errMsg = errorObj.message;

		if (!description) {
			description = errMsg;
		}
	} else {
		// eslint-disable-next-line prettier/prettier, no-lonely-if
		if (!description) {
			description = 'Error Occurred';
		}
	}

	return {
		code,
		status: 'error',
		success: false,
		data,
		description,
		meta,
	};
}
