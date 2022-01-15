import React from 'react';

import { Button } from '@chakra-ui/react';
import { useMatch, useNavigate } from 'react-location';

import { routerHistory } from '../../../routes/routerHistory';

import ErrorPage500 from './ErrorPage500';

export default function ErrorPage500ForReactLocation() {
	const matchedLocation = useMatch();
	const { error } = matchedLocation;

	const navigate = useNavigate();

	return (
		<ErrorPage500
			title='UNEXPECTED ERROR OCCURRED WHILE PERFORMING DATA SUMMONING CHARM (AXIOS) SPELL ON THE PAGE'
			error={error as Error}
			additionalErrorDetails='This occur when ReactLocation loader function throw and Error. Check "routes/mainRoutes.tsx" for More Info.'
			customButtonsList={
				<>
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
				</>
			}
		/>
	);
}
