import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export default function HomePage() {
	return (
		<Box>
			<Heading>Wizard Passport</Heading>
			<Text fontFamily='fancy' fontSize='70'>
				Hi Muggle Wizards
			</Text>
			<Text>Get your Wizard Passport, Today</Text>
		</Box>
	);
}
