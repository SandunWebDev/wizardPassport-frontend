import React from 'react';

import { Center } from '@chakra-ui/react';
import { Link } from 'react-location';

function propsOnLinkActive() {
	return {
		style: {
			fontWeight: 'bold',
			color: 'lightblue ',
		},
	};
}

const headerLinks = [
	{ path: '/', title: 'Home' },
	{ path: '/knowledge-hub', title: 'Knowledge Hub' },
	{ path: '/about', title: 'About' },
	{ path: '/generate-passport', title: 'Generate Passport' },
];

export default function Header() {
	return (
		<Center
			className='Header'
			height='60px'
			sx={{
				bg: 'gray.400',
				a: {
					margin: 10,
				},
				'a:hover': {
					color: 'blue.700',
				},
			}}>
			{headerLinks.map((link) => (
				<Link key={link.path} to={link.path} getActiveProps={propsOnLinkActive}>
					{link.title}
				</Link>
			))}
		</Center>
	);
}
