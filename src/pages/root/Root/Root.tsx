import React from 'react';

import {
	ChakraProvider,
	ColorModeScript,
	ConfigColorMode,
} from '@chakra-ui/react';
import { ReactLocation, Router } from 'react-location';
import { parseSearch, stringifySearch } from 'react-location-jsurl';
import { rankRoutes } from 'react-location-rank-routes';

import chakraCustomTheme from '../../../configs/chakraThemeConfig';
import { mainRoutes } from '../../../routes/mainRoutes';
import { routerHistory } from '../../../routes/routerHistory';
import ErrorPage500 from '../../customStatusPages/ErrorPage500';
import PageLoader from '../../customStatusPages/PageLoader';
import App from '../App/App';

import '../../../index.css';

const reactLocation = new ReactLocation({
	history: routerHistory, // In most cases, We don't have to explicity define the history object, as it is defined automatically by 'react-location. But for certain cases we may need it. So we explicity provide it.

	// Plugins
	parseSearch, // See "https://react-location.tanstack.com/tools/jsurl"
	stringifySearch,
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
					defaultErrorElement={<ErrorPage500 />}>
					<App />
				</Router>
			</ChakraProvider>
		</React.StrictMode>
	);
}

export default Root;
