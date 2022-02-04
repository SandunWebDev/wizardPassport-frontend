import React from 'react';

import axios from 'axios';
import { DefaultGenerics, Navigate, Route } from 'react-location';
import wait from 'waait';

import ErrorPage404 from '../components/errorHandling/customErrorStatusPages/ErrorPage404';
import globalValues from '../configs/globalValues';
import AboutPage from '../pages/AboutPage/AboutPage';
import DevOnlyPage from '../pages/DevOnlyPage/DevOnlyPage';
import GeneratePassportPage from '../pages/GeneratePassportPage/GeneratePassportPage';
import HomePage from '../pages/HomePage/HomePage';
import KnowledgeHubPage from '../pages/KnowledgeHubPage/KnowledgeHubPage';
import MyPassportPage from '../pages/MyPassportPage/MyPassportPage';

const isDevelopment = globalValues.environment.IS_DEVELOPMENT;

// SIDE-NOTE : If you want "React-Route" like representation instead of this Array Version, See "https://react-location.tanstack.com/tools/elements-to-routes"
const mainRoutes: Route<DefaultGenerics>[] = [
	{
		path: '/',
		element: <HomePage />,
	},

	{
		path: '/generate-passport',
		children: [
			{
				path: '/',
				element: <GeneratePassportPage />,
			},
			{
				path: '*',
				element: <ErrorPage404 />,
			},
		],
	},

	{
		path: '/my-passport',
		children: [
			{
				path: '/',
				element: <MyPassportPage />,
			},
			{
				path: '*',
				element: <ErrorPage404 />,
			},
		],
	},

	{
		path: '/knowledge-hub',
		children: [
			{
				path: '/',
				element: <KnowledgeHubPage />,
			},
			{
				path: '/character',
				children: [
					{
						path: '/',
						element: <ErrorPage404 />,
					},
					{
						path: ':characterId/',
						element: <div>Character Is</div>,
					},
					{
						path: '*',
						element: <ErrorPage404 />,
					},
				],
			},
			{
				path: '*',
				element: <ErrorPage404 />,
			},
		],
	},

	{
		path: '/about',
		children: [
			{
				path: '/',
				element: <AboutPage />,
			},
			{
				path: '*',
				element: <ErrorPage404 />,
			},
		],
	},

	// Root Level Default/Fallback Route
	{
		path: '*', // SIDE-NOTE: Even if we omit this line, By default it will be "*"
		element: <Navigate to='/' />,
	},
];

// These are temporary routes, Which only available in development mode. These used for checking and learning things out.
// Just check things out to learn capabilities of React Location & Other Libraries.
if (isDevelopment) {
	const testRoutes: Route<DefaultGenerics> = {
		path: '/test',
		loader: async () => {
			return {
				staffCharacters: await axios.get(
					'http://hp-api.herokuapp.com/api/characters/staff',
				),
			};
		},
		children: [
			{
				path: '/',
				element: <DevOnlyPage />,
			},
			{
				path: '/house/:houseId',
				// SIDE-NOTE : If we want to code-split, We can do something like, "element: () => import('./Expensive').then((mod) => <mod.default />)"
				element: <DevOnlyPage />,

				// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
				loader: async ({ params: { houseId } }, { parentMatch, dispatch }) => {
					await wait(5000);

					return {
						gryffindorCharacters: await axios.get(
							`http://hp-api.herokuapp.com/api/characters/house/${houseId}`,
						),
					};
				},
				pendingElement: async () => <div>Loading Characters</div>,
				pendingMs: 1000 * 2, // Default time wait until pending element is shown.
				pendingMinMs: 500, // If it's shown, ensure the pending element is rendered for at least 500ms (Mostly to avoid flickers, when resolved very quickly)
				// errorElement: 'Error Occurred while Fetching Characters',
				loaderMaxAge: 1000 * 5, // How long fetch data should be cached.

				meta: {
					a: 10,
					myBreadcrumb: () => <div>Hello</div>,
					customPagePendingMessage: 'Loading Characters',
				},

				// Other Useful Props
				// search, searchFilters, onMatch, onTransition
			},
		],
	};

	mainRoutes.push(testRoutes);
}

export { mainRoutes };
