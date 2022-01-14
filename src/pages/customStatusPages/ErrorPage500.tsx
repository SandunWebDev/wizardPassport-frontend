import React from 'react';

import {
	Heading,
	Image,
	VStack,
	Center,
	Button,
	ButtonGroup,
	Text,
} from '@chakra-ui/react';
import { useMatch, useNavigate } from 'react-location';

import errorPage500IllustrationPath from '../../assets/images/errorPage500_Illustration.svg';
import PageTemplate from '../../components/pageTemplates/PageTemplate/PageTemplate';
import globalValues from '../../configs/globalValues';
import { routerHistory } from '../../routes/routerHistory';

export default function ErrorPage404() {
	const matchedLocation = useMatch();
	const { error } = matchedLocation;

	const errorMessage = error instanceof Error ? error.message : null;
	const isDevelopment = globalValues.environment.IS_DEVELOPMENT;

	const navigate = useNavigate();

	return (
		<PageTemplate type='default'>
			<Center flex='1'>
				<VStack>
					<Heading as='h1' fontSize='10rem' marginBottom='-30px'>
						500
					</Heading>

					<Heading as='h3' size='md'>
						UNEXPECTED ERROR OCCURRED WHILE LOADING THE PAGE
					</Heading>

					{isDevelopment && <Text>{errorMessage}</Text>}

					<Image src={errorPage500IllustrationPath} maxWidth='500px' />

					<ButtonGroup>
						<Button
							onClick={() => {
								navigate({ to: '.' });
							}}>
							TRY AGAIN
						</Button>

						<Button
							onClick={() => {
								routerHistory.back();
							}}>
							GO BACK
						</Button>

						<Button
							onClick={() => {
								navigate({ to: '/' });
							}}>
							HOME
						</Button>
					</ButtonGroup>
				</VStack>
			</Center>
		</PageTemplate>
	);
}
