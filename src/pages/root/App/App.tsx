import React from 'react';

import { Progress, Box, Spinner, Icon, HStack } from '@chakra-ui/react';
import { Offline } from 'react-detect-offline';
import { RiWifiOffLine as RiWifiOffLineIcon } from 'react-icons/ri';
import { Outlet, useRouter } from 'react-location';
import { ReactLocationDevtools } from 'react-location-devtools';
import { useIsFetching, useIsMutating } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Header from '../../../components/Header/Header';
import { toast } from '../../../components/toasters/Toaster/Toaster';

import './App.css';

function App() {
	const router = useRouter();

	const isAnyFetchingReq = useIsFetching();
	const isAnyMutatingReq = useIsMutating();
	const isAnyBackgroundReq = isAnyFetchingReq || isAnyMutatingReq;

	return (
		<div className='App'>
			{/* Just showing some navigation indicator when route with asynchronous loading is happening.
			    But, If it take longer than "defaultPendingMs/pendingMs" value, Then what defined in "defaultPendingElement/pendingElement" will be shown.  */}
			{router.pending ? (
				<Box top='0' position='absolute' width='100%'>
					<Progress size='sm' bg='none' isIndeterminate />
				</Box>
			) : null}

			<Header />

			{/*	Below component will render "Matching route path's element, If applicable"	*/}
			<Outlet />

			{/*	Below component will render "ReactLocation Dev. Tools" & "ReactQuery Dev Tools", Only in Development Mode */}
			<ReactLocationDevtools initialIsOpen={false} position='bottom-left' />
			<ReactQueryDevtools
				initialIsOpen={false}
				position='bottom-left'
				toggleButtonProps={{
					style: {
						position: 'fixed',
						left: '50px',
					},
				}}
			/>

			{/* Some Global Level Indicators */}
			<Box position='fixed' bottom='5' right='5'>
				<HStack spacing='15px'>
					{/* If any Req. happen using React Query. */}
					{isAnyBackgroundReq ? (
						<Spinner title='Some background fetching are in progress.' />
					) : null}

					{/* When device is Offline */}
					<Offline
						onChange={(isOnline) => {
							if (isOnline) {
								toast.info('You are back Online.');
							} else {
								toast.warning('You are Offline.');
							}
						}}>
						<Icon as={RiWifiOffLineIcon} boxSize={6} title='Offline' />
					</Offline>
				</HStack>
			</Box>
		</div>
	);
}

export default App;
