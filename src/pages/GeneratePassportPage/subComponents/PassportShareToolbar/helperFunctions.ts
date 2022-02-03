/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { TPassportData } from '../../../../commonTypes/passport';
import globalValues from '../../../../configs/globalValues';
import { encodeToBase64Url } from '../../../../utilities/encodingUtilities';

const { FRONTEND_BASEURL, BACKEND_BASEURL } = globalValues.baseURLS;
const passportAsSvgApiEndpoint = `${BACKEND_BASEURL}/passport-as-svg`;

export function getMyPassportPageRouteSearchParamsAsObject(
	passportData: TPassportData,
) {
	return { encodedPassportData: encodeToBase64Url(passportData) };
}

export function getMyPassportPageRouteSearchParamsAsString(
	passportData: TPassportData,
) {
	const encodedPassportData = encodeToBase64Url(passportData);
	return `?encodedPassportData=${encodedPassportData}`;
}

export function getDirectLinkToMyPassportPage(passportData: TPassportData) {
	const encodedPassportDataString =
		getMyPassportPageRouteSearchParamsAsString(passportData);

	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	return `${FRONTEND_BASEURL}/my-passport/${encodedPassportDataString}`;
}

export function getIFrameCodeAsString(passportData: TPassportData) {
	const encodedMyPassportPageSearchParams =
		getMyPassportPageRouteSearchParamsAsString(passportData);

	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	const srcUrl = `${FRONTEND_BASEURL}/my-passport${encodedMyPassportPageSearchParams}&isIFrame=true`;

	return `
	<iframe
		src='${srcUrl}'
		style='border:0px #ffffff none;'
		name='Wizard Passport'
		scrolling='no'
		frameborder='0'
		marginheight='0px'
		marginwidth='0px'
		width='500px'
		height='292px'
		allowfullscreen>
	</iframe>`;
}

export function getMarkdownCodeAsString(passportData: TPassportData) {
	const encodedMyPassportPageSearchParams =
		getMyPassportPageRouteSearchParamsAsString(passportData);

	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	const src = `${passportAsSvgApiEndpoint}/${encodedMyPassportPageSearchParams}`;

	// Currently ignored because we can't set width/height for this.
	// const baseMarkdownVersion = `![Wizard Passport](${src})`;

	return `<img src='${src}' alt='Wizard Passport' width='500px' />`;
}

export function getDirectSvgLink(passportData: TPassportData) {
	const encodedMyPassportPageSearchParams =
		getMyPassportPageRouteSearchParamsAsString(passportData);

	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	return `${passportAsSvgApiEndpoint}/${encodedMyPassportPageSearchParams}`;
}
