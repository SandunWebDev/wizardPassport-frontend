import React from 'react';

import { Box, Heading, Text, Button } from '@chakra-ui/react';

import { toast } from '../../components/toasters/Toaster/Toaster';

export default function HomePage() {
	return (
		<Box>
			<Heading>Wizard Passport</Heading>
			<Text fontFamily='fancy' fontSize='70'>
				Hi Muggle Wizards
			</Text>
			<Text>Get your Wizard Passport, Today</Text>
			<Button
				onClick={() => {
					toast.success('SUCCESS');
					toast.info('INFO');
					toast.warning('WARNING');
					toast.error('ERROR');
				}}>
				FIRE
			</Button>
		</Box>
	);
}
