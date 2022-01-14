import React from 'react';

import { Progress, Box } from '@chakra-ui/react';
import { Outlet, useRouter } from 'react-location';
import { ReactLocationDevtools } from 'react-location-devtools';

import Header from '../../../components/Header/Header';

import './App.css';

function App() {
	const router = useRouter();

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

			{/*	Below component will render "ReactLocation Developer Tools", Only in Development Mode */}
			<ReactLocationDevtools initialIsOpen={false} />
		</div>
	);
}

export default App;
