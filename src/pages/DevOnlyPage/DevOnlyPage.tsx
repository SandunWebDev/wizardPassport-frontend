/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import React from 'react';

import { Spinner, Box, Heading } from '@chakra-ui/react';
import ReactJsonView from 'react-json-view';
import {
	Link,
	MatchRoute,
	useMatch,
	useMatchRoute,
	useNavigate,
	usePrompt,
} from 'react-location';

import './DevOnlyPage.css';

// NOTE : A page, Tha only used in development environment, To test things out.

const defaultReactJsonViewProps = {
	indentWidth: 2,
	collapsed: 2,
	enableClipboard: false,
	displayObjectSize: false,
	displayDataTypes: false,
	displayArrayKey: false,
};

export default function DevOnlyPage() {
	// Accessing current location data.
	// SIDE-NOTE : If we want to access all matches use "useMatches() OR useRouter().matches"
	const matchedRoute = useMatch();
	const {
		pathname, // Matched path as string
		params, // Param Values
		search, // Query String Values. (We can directly use "useSearch()" hook for this too)
		route, // Contain path, id, etc... Specially "meta" property.

		// Below are relevant when "loader" is used.
		data, // Data returned by each matched route's loader.
		ownData, // Data returned by only current specific route's loader.
		isLoading,
		pendingElement,
		error,
		errorElement,
		...more1
	} = matchedRoute;

	const navigate = useNavigate(); // We can instead use <Navigate/> too,

	const matchRoute = useMatchRoute(); // We can instead use <MatchRoute/> too,

	usePrompt('There are unsaved changes, are you sure you want to leave?', true); // We can instead use <Prompt/> too,

	return (
		<Box className='DevOnlyPage'>
			<Heading as='h1'>DevOnly Page</Heading>

			<Box>
				<Heading as='h3'>LINKS</Heading>

				<Link to='/home'>Goto Home</Link>

				<Link
					to='.' // Can use Relative Paths, Root Paths.
					getActiveProps={() => {
						// We can use this prop to add some additional props to <Link> when current location match with "to"
						// OR we can just use fn as children inside <Link>, which pass "isActive" prop to it. (https://react-location.tanstack.com/docs/api#link)
						return {
							style: {
								color: 'red',
							},
						};
					}}
					search={(existingSearchValues) => ({ a: 10, b: 20 })}>
					DevOnly Page
				</Link>

				<Link to='/test/gryffindor'>
					Dashboard{' '}
					<MatchRoute to='/test/gryffindor' pending>
						<Spinner />
					</MatchRoute>
				</Link>

				<button
					onClick={() => {
						navigate({ to: '/' });
					}}>
					Programmatically Navigate
				</button>
			</Box>

			<div>{matchRoute({ to: '/test' }) && 'HELLO'}</div>

			<div>
				<h2>React Location Stuff</h2>
				<ReactJsonView
					{...defaultReactJsonViewProps}
					src={{
						pathname,
						params,
						search,
						route,

						// Below are relevant when "loader" is used.
						data,
						ownData,
						isLoading,
						pendingElement,
						error,
						errorElement,
					}}
				/>
			</div>
		</Box>
	);
}
