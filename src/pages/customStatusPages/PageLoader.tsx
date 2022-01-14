import React from 'react';

import {
	Box,
	Button,
	ButtonGroup,
	Center,
	Spinner,
	VStack,
} from '@chakra-ui/react';
import { useMatch, useNavigate } from 'react-location';

import PageTemplate from '../../components/pageTemplates/PageTemplate/PageTemplate';
import { routerHistory } from '../../routes/routerHistory';

type PageLoaderMeta = {
	customPagePendingMessage?: string;
};

export default function PageLoader() {
	const matchedRoute = useMatch();
	const { meta } = matchedRoute.route;
	const { customPagePendingMessage } = meta as PageLoaderMeta;

	const navigate = useNavigate();

	return (
		<PageTemplate type='default'>
			<Center flex={2}>
				<VStack>
					<Spinner
						thickness='4px'
						speed='0.65s'
						emptyColor='gray.200'
						color='blue.500'
						size='xl'
					/>

					{customPagePendingMessage ? (
						<Box>{customPagePendingMessage}</Box>
					) : (
						<Box>
							Your requested page seem to take longer than expected. Please be
							Patient.
						</Box>
					)}

					<ButtonGroup>
						<Button
							onClick={() => {
								routerHistory.back();
							}}>
							CANCEL
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
