/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';

import {
	ChakraProvider,
	ColorModeScript,
	ConfigColorMode,
} from '@chakra-ui/react';
import { ReactLocation, Router } from 'react-location';
import { parseSearch, stringifySearch } from 'react-location-jsurl';
import { rankRoutes } from 'react-location-rank-routes';
import {
	QueryClient,
	QueryClientProvider,
	QueryCache,
	setLogger,
} from 'react-query';

import ErrorPage500ForReactLocation from '../../../components/errorHandling/customErrorStatusPages/ErrorPage500ForReactLocation';
import PageLevelErrorBoundary from '../../../components/errorHandling/errorBoundaries/PageLevelErrorBoundary/PageLevelErrorBoundary';
import { ConfiguredReactHotToasterProvider } from '../../../components/toasters/Toaster/Toaster';
import chakraCustomTheme from '../../../configs/chakraThemeConfig';
import { mainRoutes } from '../../../routes/mainRoutes';
import { routerHistory } from '../../../routes/routerHistory';
import log from '../../../utilities/logger';
import PageLoader from '../../customStatusPages/PageLoader';
import App from '../App/App';

import '../../../index.css';

const reactLocation = new ReactLocation({
	history: routerHistory, // In most cases, We don't have to explicity define the history object, as it is defined automatically by 'react-location. But for certain cases we may need it. So we explicity provide it.

	// Plugins
	parseSearch, // See "https://react-location.tanstack.com/tools/jsurl"
	stringifySearch,
});

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		// Kind of Global Level Error Handler. This is called, Whether error is handled at another level or error boundary or not.
		onError: (error: unknown, query) => {
			// SIDE-NOTE : For example, With providing custom data with 'meta' property in each query we can do some custom toast error messages in here.
			//             For now, Just logging it out.
			//             See "https://tkdodo.eu/blog/react-query-error-handling" for more info.

			console.log('GLOBAL QUERY CACHE ERROR:', error, query);
		},
	}),
	defaultOptions: {
		queries: {
			// DEFAULT QUERY OPTIONS GOES HERE (For useQuery Hook)
		},
		mutations: {
			// DEFAULT MUTATION OPTIONS GOES HERE (For useMutation Hook)
		},
	},
});

// Setting up, Our custom logger functions for ReactQuery related logs.
setLogger({
	log: log.info,
	warn: log.warn,
	error: log.error,
});

function Root() {
	return (
		<React.StrictMode>
			{/* Initializing Chakra Light/Dark Mode */}
			<ColorModeScript
				initialColorMode={
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
					chakraCustomTheme.config!.initialColorMode as ConfigColorMode
				}
			/>

			<ChakraProvider theme={chakraCustomTheme}>
				<ConfiguredReactHotToasterProvider />

				<Router
					location={reactLocation}
					routes={mainRoutes}
					filterRoutes={rankRoutes} // Plugin. (Sort the "routes" array list) See "https://react-location.tanstack.com/tools/rank-routes"
					basepath='/'
					caseSensitive={false}
					// --------------------------------
					// Below are only applicable when "loader" is used in a route and explicit error, pending, etc.. values are not used in there.
					defaultLoaderMaxAge={1000 * 5} // How long route data should be cashed.
					defaultPendingElement={<PageLoader />}
					defaultPendingMs={1000 * 5} // Default time wait until pending element is shown.
					defaultPendingMinMs={500} // If it's shown, ensure the pending element is rendered for at least 500ms (Mostly to avoid flickers, when resolved very quickly)
					defaultErrorElement={<ErrorPage500ForReactLocation />}>
					<PageLevelErrorBoundary>
						<QueryClientProvider client={queryClient}>
							<App />
						</QueryClientProvider>
					</PageLevelErrorBoundary>
				</Router>
			</ChakraProvider>
		</React.StrictMode>
	);
}

export default Root;
