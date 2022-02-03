/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable unicorn/prefer-module */
// eslint-disable-next-line @typescript-eslint/no-var-requires

import { apiError } from '../apiHelpers/requestHandlers';
import { TPassportData, passportDataSchema } from '../src/commonTypes/passport';
import { decodeEncodedBase64UrlToValue } from '../src/utilities/encodingUtilities';

import type { VercelRequest, VercelResponse } from '@vercel/node';

// NOTE : Below "babel" stuff is defined to enable on-demand transpiling of the code. (In simple terms transpiling as "require")
//        In our case, We need this because we use React component in some places. For example check "require('../apiHelpers/passportAsSvgHelpers')" in below code.
import '@babel/preset-env';
import '@babel/preset-react';

import 'ignore-styles';
import 'babel-polyfill';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
require('@babel/register')({
	ignore: [/(node_modules)/],
	presets: ['@babel/preset-env', '@babel/preset-react'],
});

// eslint-disable-next-line consistent-return
export default (request: VercelRequest, response: VercelResponse) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {
		generateSvgMarkupFromPassportData,
	} = require('../apiHelpers/passportAsSvgHelpers');

	const searchParams = request.query;
	const { encodedPassportData } = searchParams;

	// Track if error occurred while decoding/verifying passport data.
	let isError = false;

	// Decoding/Verifying passport data.
	let decodedPassportData: TPassportData | null = null;
	try {
		decodedPassportData = decodeEncodedBase64UrlToValue(
			encodedPassportData as string,
		) as TPassportData;

		// If invalid error will be thrown.
		passportDataSchema.validateSync(decodedPassportData);
	} catch {
		isError = true;
	}

	if (isError) {
		return response
			.status(400)
			.send(apiError({ code: 400, description: 'Invalid Request' }));
	}

	if (decodedPassportData !== null) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const passportAsSvgMarkup =
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			generateSvgMarkupFromPassportData(decodedPassportData);

		response.setHeader('Content-Type', 'image/svg+xml');
		response.status(200).send(passportAsSvgMarkup);
	}
};
