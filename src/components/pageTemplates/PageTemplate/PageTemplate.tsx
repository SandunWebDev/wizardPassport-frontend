// NOTE : This component should used in pages to wrap things around suitable template type.
//         In most case, Ex. <TemplatePage type='default'>XXXXX</TemplatePage>

import React from 'react';

import BaseTemplatePage, {
	BaseTemplatePageProps,
} from '../templateTypes/BaseTemplatePage/BaseTemplatePage';
import DefaultTemplatePage, {
	DefaultTemplatePageProps,
} from '../templateTypes/DefaultTemplatePage/DefaultTemplatePage';

type TemplateTypesWithTheirPropTypes = {
	base: BaseTemplatePageProps;
	default: DefaultTemplatePageProps;
};

// Possible template types. Like "base, default, ..."
type TemplateTypes = keyof TemplateTypesWithTheirPropTypes;

// Helper utility to get individual template type and its corresponding prop types.
export interface GetTemplateTypeAndPropTypes<T extends TemplateTypes> {
	type: T;
	templateProps?: TemplateTypesWithTheirPropTypes[T];
}

type CommonPageTemplateProps = {
	children: React.ReactNode;
};

type OptionalPageTemplateProps =
	| GetTemplateTypeAndPropTypes<'base'>
	| GetTemplateTypeAndPropTypes<'default'>;
// | {
// 		type?: never;
// 		templateProps?: never;
//   };

type FullPageTemplateProps = CommonPageTemplateProps &
	OptionalPageTemplateProps;

/**
 SIDE-NOTE : In simple sense this is some-what equivalent to just doing like below.

 type OptionalPageTemplateProps =
	| {
			type: 'base';
			templateProps?: BaseTemplatePageProps;
	  }
	| {
			type: 'default';
			templateProps?: DefaultTemplatePageProps;
	  }
	// | {
	// 		type?: never;
	// 		templateProps?: never;
	//   };

 type FullPageTemplateProps = CommonPageTemplateProps & OptionalPageTemplateProps

 */

export default function PageTemplate(props: FullPageTemplateProps) {
	const { type = 'default', templateProps, children } = props;

	switch (type) {
		case 'base': {
			return <BaseTemplatePage {...templateProps}>{children}</BaseTemplatePage>;
		}
		case 'default': {
			return (
				<DefaultTemplatePage {...templateProps}>{children}</DefaultTemplatePage>
			);
		}
		// eslint-disable-next-line sonarjs/no-duplicated-branches
		default: {
			return (
				<DefaultTemplatePage {...templateProps}>{children}</DefaultTemplatePage>
			);
		}
	}
}
