import {
	ChakraProvider,
	ColorModeScript,
	ConfigColorMode,
} from '@chakra-ui/react';
import React from 'react';

import chakraCustomTheme from '../../../configs/chakraThemeConfig';
import HomePage from '../../HomePage/HomePage';

import './App.css';

function App() {
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
				<div className='App'>
					<HomePage />
				</div>
			</ChakraProvider>
		</React.StrictMode>
	);
}

export default App;
