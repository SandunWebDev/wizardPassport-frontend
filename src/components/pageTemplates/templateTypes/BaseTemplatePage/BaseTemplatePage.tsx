import React from 'react';

import { Flex } from '@chakra-ui/react';

export type BaseTemplatePageProps = {
	top?: React.ReactNode;
	children?: React.ReactNode;
	bottom?: React.ReactNode;
};

export default function BaseTemplatePage({
	children,
	top,
	bottom,
}: BaseTemplatePageProps) {
	return (
		<Flex direction='column' minHeight='100vh'>
			{top}
			<Flex direction='column' flex='1'>
				{children}
			</Flex>
			{bottom}
		</Flex>
	);
}
