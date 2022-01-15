import React from 'react';

import errorPage500IllustrationPath from '../../../assets/images/errorPage500_Illustration.svg';
import PageLevelError, {
	PageLevelErrorProps,
} from '../helperComponents/PageLevelError/PageLevelError';

type ErrorPage500Props = PageLevelErrorProps;

export default function ErrorPage500(props: ErrorPage500Props) {
	const pageLevelErrorProps: ErrorPage500Props = {
		pageTemplateType: 'default',
		statusCode: 500,
		title: 'UNEXPECTED ERROR OCCURRED WHILE PERFORMING YOUR MAGIC SPELL',
		subTitle: '',
		imageSrc: errorPage500IllustrationPath,
		...props,
	};

	return <PageLevelError {...pageLevelErrorProps} />;
}
