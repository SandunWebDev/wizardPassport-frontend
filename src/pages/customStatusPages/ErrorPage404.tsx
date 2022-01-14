import React from 'react';

import {
	VStack,
	Button,
	ButtonGroup,
	Center,
	Heading,
	Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-location';

import errorPage404IllustrationPath from '../../assets/images/errorPage404_Illustration.svg';
import PageTemplate from '../../components/pageTemplates/PageTemplate/PageTemplate';
import { routerHistory } from '../../routes/routerHistory';

export default function ErrorPage404() {
	const navigate = useNavigate();

	return (
		<PageTemplate type='default'>
			<Center flex='1'>
				<VStack>
					<Heading as='h1' fontSize='10rem' marginBottom='-30px'>
						404
					</Heading>

					<Heading as='h3' size='md'>
						PAGE YOU REQUESTED NOT EXIST.
					</Heading>

					<Image src={errorPage404IllustrationPath} maxWidth='500px' />

					<ButtonGroup>
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
