import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints, mode } from '@chakra-ui/theme-tools';

import './fonts';

// Overall Configs.
const config = {
	// Dark/Light Mode related configs. (See https://chakra-ui.com/docs/features/color-mode)
	initialColorMode: 'light',
	useSystemColorMode: false,

	// Prefixing Chakra generated styles/classnames. (See https://chakra-ui.com/docs/theming/theme#config)
	cssVarPrefix: 'ck', // Default was "chakra"
};

// Setting up custom breakpoints. (See https://chakra-ui.com/docs/features/responsive-styles)
const breakpoints = createBreakpoints({
	xs: '320px',
	sm: '420px',
	md: '768px',
	lg: '960px',
	xl: '1200px',
	'2xl': '1536px',
});

// Setting up Global/Root Level styles. (See https://chakra-ui.com/docs/features/global-styles)
const globalStyles = {
	global: (props: Record<string, unknown>) => ({
		'html, body': {
			fontSize: '14px',
			bg: mode('white', 'gray.800')(props) as string, // Similar to props.colorMode === "dark" ? darkMode : lightMode
		},

		// Removing Chakra's default focus outline from every element.
		'*:focus': {
			boxShadow: 'none !important',
			outline: '0 solid  !important',
		},

		'a:hover': {
			color: '#FF7264', // Color also defined in "colors.links.hover"
		},
	}),
};

// Custom "Layer Styles" Packs. (See https://chakra-ui.com/docs/features/text-and-layer-styles)
// These can be used to simply add common set of styles to comps. without declaring again and again.
// Ex.  <Box layerStyle="myBox">This is a box</Box>
const customLayerStylesPacks = {
	myBox: {
		bg: 'gray.50',
		border: '2px solid',
		borderColor: 'gray.500',
	},

	// Use this style to wrap page contain into "1358px" wide container. So in large resolutions it not look ugly.
	pageContainer: {
		maxWidth: '1358px',
		margin: '0 auto',
		padding: '0 20px',
	},
};

// Custom "Text Styles" Packs. (See https://chakra-ui.com/docs/features/text-and-layer-styles)
// These can be used to simply add common set of text styles to comps. without declaring again and again.
// Ex.  <Box textStyle="myH1">This is a box</Box>
const customTextStylesPacks = {
	myH1: {
		fontSize: ['48px', '72px'],
		fontWeight: 'bold',
		lineHeight: '110%',
		letterSpacing: '-2%',
	},
};

/**
 * Extending Base Theme and Component Level Defaults
 * See below pages for more info.
 *  - https://chakra-ui.com/docs/theming/theme
 *  - https://chakra-ui.com/docs/theming/customize-theme
 *  - https://chakra-ui.com/docs/theming/component-styles
 *  - https://chakra-ui.com/docs/theming/advanced
 *
 *
 * SIDENOTE :
 *  - Values defined in here can be accessed as CSS Variables in ".CSS" files too, if needed. (See https://chakra-ui.com/docs/features/css-variables)
 *      Ex.  var(--chakra-colors-myBrand-900);
 */
const extendThemeStyles = {
	colors: {
		// Overriding Defaults
		black: '#242633',

		// Custom (Can use any key Names)
		// Example Usage  <Box bg="brand.blue.light">Welcome</Box>
		brand: {
			background: {
				primary: '#242633',
			},

			text: {
				primary: 'white',

				heading1: '#68D391', // green.300
				heading2: '#4FD1C5', // teal.300
			},

			links: {
				normal: 'lightblue',
				hover: '#FF7264', // Check above "globalStyles" section too.
			},

			primary: '#242633', // Blackish Color
			primaryAlternative: 'teal',
			secondaryAlternative: 'teal',

			buttons: 'teal.500',
		},
	},

	fonts: {
		// Overriding Defaults.
		body: 'Saira Condensed, system-ui, sans-serif',
		heading: 'Fugaz One, Georgia, display, sans-serif',

		// Custom (Can use any key Names)
		fancy: 'Comforter Brush, sans-serif',
	},
};

// My Own Custom Values (Just for convince.)
// To use these just directly import "customStyleValues" or "chakraCustomTheme" and reference them.
// Ex. customStyleValues.header.height OR chakraCustomTheme.customStyleValues.header.height
// eslint-disable-next-line @typescript-eslint/no-explicit-any

export const customStyleValues = {
	header: {
		height: 70, // px
	},

	buttons: {
		primary: {
			colorScheme: 'teal',
			fontSize: 'md',
		},
	},
};

const chakraCustomTheme = extendTheme({
	config,
	breakpoints,
	styles: globalStyles,
	layerStyles: customLayerStylesPacks,
	textStyles: customTextStylesPacks,

	// Custom (Can use any key Names)
	customStyleValues,

	...extendThemeStyles,
});

export default chakraCustomTheme;
