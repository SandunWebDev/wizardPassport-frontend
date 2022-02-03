import React from 'react';

import ReactDOMServer from 'react-dom/server';

import { TPassportData } from '../src/commonTypes/passport';
import Passport from '../src/components/Passport/Passport';

// Helper function to create SVG Markup Version of <Passport /> component with given values.
export function generateSvgMarkupFromPassportData(
	passportData: TPassportData,
): SVGSVGElement {
	return ReactDOMServer.renderToString(
		<Passport {...passportData} width='500px' height='292px' />,
	) as unknown as SVGSVGElement;
}
