import React from 'react';

import Header from '../../../Header/Header';
import BaseTemplatePage from '../BaseTemplatePage/BaseTemplatePage';

export type DefaultTemplatePageProps = {
	children?: React.ReactNode;
};

export default function DefaultTemplatePage({
	children,
}: DefaultTemplatePageProps) {
	return <BaseTemplatePage top={<Header />}>{children}</BaseTemplatePage>;
}
