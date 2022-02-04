import React from 'react';

import { Box, Progress } from '@chakra-ui/react';
import { Outlet, useRouter } from 'react-location';
import { ReactLocationDevtools } from 'react-location-devtools';
import { ReactQueryDevtools } from 'react-query/devtools';
import SimpleBar from 'simplebar-react';

import WebStatusIndicators from '../../../components/widgets/WebStatusIndicators/WebStatusIndicators';
import './App.css';

function App() {
	const router = useRouter();

	return (
		<div className='App'>
			{/* Custom Scroll Bar. Style overrides are done on "styles/overrides/simplebarReact.css" */}
			<SimpleBar
				style={{ height: '100vh', width: '100vw' }}
				autoHide
				timeout={1000}
				scrollbarMinSize={50}
				scrollbarMaxSize={500}>
				{/* Just showing some navigation indicator when route with asynchronous loading is happening.
			    But, If it take longer than "defaultPendingMs/pendingMs" value, Then what defined in "defaultPendingElement/pendingElement" will be shown.  */}
				{router.pending ? (
					<Box top='0' position='absolute' width='100%'>
						<Progress size='sm' bg='none' isIndeterminate />
					</Box>
				) : null}

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
				<WebStatusIndicators />
			</SimpleBar>
		</div>
	);
}

export default App;
