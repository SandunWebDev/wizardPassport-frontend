import React from 'react';

import { Button } from '@chakra-ui/react';
import { AiFillHome as AiFillHomeIcon } from 'react-icons/ai';
import { IoMdRefresh as IoMdRefreshIcon } from 'react-icons/io';
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
						leftIcon={<IoMdRefreshIcon style={{ marginTop: '-1px' }} />}
						onClick={() => {
							routerHistory.back();
						}}>
						GO BACK
					</Button>

					<Button
						leftIcon={<AiFillHomeIcon style={{ marginTop: '-1px' }} />}
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
