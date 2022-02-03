import React from 'react';

import Footer from '../../../Footer/Footer';
import Header from '../../../Header/Header';
import BaseTemplatePage from '../BaseTemplatePage/BaseTemplatePage';

export type DefaultTemplatePageProps = {
	children?: React.ReactNode;
};

export default function DefaultTemplatePage({
	children,
}: DefaultTemplatePageProps) {
	return (
		<BaseTemplatePage top={<Header />} bottom={<Footer />}>
			{children}
		</BaseTemplatePage>
	);
}
