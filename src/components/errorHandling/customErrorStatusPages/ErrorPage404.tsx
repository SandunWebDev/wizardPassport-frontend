import React from 'react';

import errorPage404IllustrationPath from '../../../assets/images/errorPage404_Illustration.svg';
import PageLevelError, {
	PageLevelErrorProps,
} from '../helperComponents/PageLevelError/PageLevelError';

type ErrorPage404Props = PageLevelErrorProps;

export default function ErrorPage404(props: ErrorPage404Props) {
	const pageLevelErrorProps: ErrorPage404Props = {
		pageTemplateType: 'default',
		statusCode: 404,
		title: 'PORTKEY YOU REQUESTED DOES NOT EXIST',
		subTitle: '',
		imageSrc: errorPage404IllustrationPath,
		additionalErrorDetails:
			'This occur when tried to render unavailable route. Check "routes/mainRoutes.tsx" for More Info.',
		...props,
	};

	return <PageLevelError {...pageLevelErrorProps} />;
}
