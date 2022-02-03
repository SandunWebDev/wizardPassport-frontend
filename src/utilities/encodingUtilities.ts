import * as htmlEntities from 'html-entities';
import { Base64 as base64 } from 'js-base64';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function encodeToBase64Url(value: any) {
	try {
		// Returning stringified, base64 encoded, urlSafe version of given value.

		const stringifiedData = JSON.stringify(value);
		const base64EncodedData = base64.encode(stringifiedData);
		return htmlEntities.encode(base64EncodedData); // Making base64EncodedData, URLSafe
	} catch {
		throw new Error(`Encoding to Base64Url Failed.`);
	}
}

export function decodeEncodedBase64UrlToValue(value: string) {
	try {
		// Decode base64 & url encoded value into original js value.

		const htmlDecodedData = htmlEntities.decode(value);
		const base64DecodedData = base64.decode(htmlDecodedData);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return JSON.parse(base64DecodedData);
	} catch {
		throw new Error(`Decoding Base64Url Failed.`);
	}
}
