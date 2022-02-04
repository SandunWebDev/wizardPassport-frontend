import React, { useEffect, useRef } from 'react';

import { AddIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Collapse,
	Divider,
	Flex,
	Heading,
	HStack,
	IconButton,
	Text,
	useBreakpointValue,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import * as bodyScrollLock from 'body-scroll-lock';
import { Link } from 'react-location';

import { ReactComponent as MainLogoSvg } from '../../assets/images/mainLogo.svg';
import { customStyleValues } from '../../configs/chakraThemeConfig';

// Return what props (Specially Stylistic) should be applied to Link component when it's the Active Location.
function propsOnLinkActive() {
	return {
		style: {
			fontWeight: 'bold',
			color: 'links.normal ',
		},
	};
}

export const headerLinks = [
	{ path: '/', title: 'Home' },
	{ path: '/knowledge-hub', title: 'Knowledge Hub' },
	{ path: '/about', title: 'About' },
	{ path: '/generate-passport', title: 'Get Passport' },
];

export default function Header() {
	const { isOpen: isMobileMenuOpen, onToggle: toggleMobileMenu } =
		useDisclosure();

	// When viewport is lower than "sm/420px", This returns true.
	// This is later used to close already opened Mobile Menu when User navigate to higher viewport without explicitly closing it.
	const isMobileMenuBreakpoint = useBreakpointValue({
		base: true,
		xs: true,
		sm: true,
		md: false,
	});

	const mobileMenuElement = useRef(null);

	// Disabling scrolling in body, When mobile menu is open.
	useEffect(() => {
		if (isMobileMenuOpen) {
			if (mobileMenuElement.current !== null) {
				bodyScrollLock.disableBodyScroll(mobileMenuElement.current);
			}
		} else {
			bodyScrollLock.clearAllBodyScrollLocks();
		}

		return function cleanUp() {
			bodyScrollLock.clearAllBodyScrollLocks();
		};
	}, [isMobileMenuOpen]);

	return (
		<Box
			position='sticky'
			top={0}
			zIndex='2000'
			width='100%'
			bg='brand.background.primary'
			color='brand.text.primary'
			className='Header'>
			<Box layerStyle='pageContainer'>
				{/* Top Bar */}
				<Box
					bg='brand.background.primary'
					display='flex'
					flexWrap='wrap'
					alignItems='center'
					height={`${customStyleValues.header.height}px`}
					padding='5px 0'>
					{/* TopBar - Left Side */}
					<HStack>
						{/* Mobile Menu Toggler - Burger Menu Icon */}
						<Flex
							flex={{ base: 1, md: 'auto' }}
							ml={{ base: -2 }}
							display={{ base: 'flex', md: 'none' }}
							marginRight='1rem'>
							<IconButton
								onClick={() => {
									toggleMobileMenu();
								}}
								icon={
									isMobileMenuOpen ? (
										<CloseIcon boxSize={3} />
									) : (
										<HamburgerIcon boxSize={7} />
									)
								}
								variant='ghost'
								title='Toggle Mobile Menu'
								aria-label='Toggle Mobile Menu'
								color='brand.text.primary'
								_hover={{
									bg: 'brand.text.primary',
									color: 'brand.background.primary',
								}}
							/>
						</Flex>

						{/* Logo + Headings */}
						<Box
							sx={{
								// Overriding default anchor color.
								'& a:hover': {
									color: 'inherit',
								},
							}}>
							<Link to='/'>
								<HStack>
									{/* Logo */}
									<Box
										width='50px'
										minWidth='50px'
										padding='3px'
										marginInlineStart='-0.5rem !important'
										sx={{
											'svg path': {
												fill: 'white !important',
											},
										}}>
										<MainLogoSvg
											style={{ fill: 'brand.text.primary' }}
											width='100%'
											height='100%'
										/>
									</Box>

									{/* Logo Headings */}
									<VStack align='left' spacing='0px'>
										<Heading
											as='h1'
											size='md'
											fontWeight='normal'
											whiteSpace='nowrap'>
											Wizard Passport
										</Heading>
										<Text lineHeight='shorter' whiteSpace='nowrap'>
											{useBreakpointValue({
												base: 'Ministry of Magic',
												xs: 'Ministry of Magic',
												sm: 'Ministry of Magic',
												md: 'Administrative Registration Department, DMLE, Ministry of Magic',
											})}
										</Text>
									</VStack>
								</HStack>
							</Link>
						</Box>
					</HStack>

					{/* TopBar - Right Side */}
					<HStack
						display={{ base: 'none', md: 'flex' }}
						align='center'
						flex={1}
						justifyContent='right'
						spacing='20px'
						fontSize='lg'
						whiteSpace='nowrap'>
						{headerLinks
							.slice(0, -1) // Removing last entry. Because we use customize button for it.
							.map((link) => (
								<Link
									key={link.path}
									to={link.path}
									getActiveProps={propsOnLinkActive}>
									{link.title}
								</Link>
							))}

						{/* GetPassport Button */}
						<Link
							to={headerLinks.slice(-1)[0].path}
							getActiveProps={propsOnLinkActive}>
							<Button
								rightIcon={<AddIcon />}
								colorScheme={customStyleValues.buttons.primary.colorScheme}
								fontSize={customStyleValues.buttons.primary.fontSize}>
								{headerLinks.slice(-1)[0].title}
							</Button>
						</Link>
					</HStack>

					{isMobileMenuOpen ? (
						<Divider
							position='absolute'
							bottom='0'
							display={{ base: 'flex', md: 'none' }}
							marginTop='10px'
						/>
					) : null}
				</Box>

				{/* Toggled Mobile Side Bar */}
				<Collapse
					in={isMobileMenuOpen && isMobileMenuBreakpoint}
					animateOpacity>
					<Box
						ref={mobileMenuElement}
						position='absolute'
						left='0'
						right='0'
						overflow='auto'
						bg='brand.background.primary'
						p='40px'
						paddingLeft='60px'
						minHeight='100vh'
						maxHeight='100%'>
						<VStack
							align='left'
							spacing='20px'
							fontSize='lg'
							whiteSpace='nowrap'>
							{/* eslint-disable-next-line sonarjs/no-identical-functions */}
							{headerLinks.map((link) => (
								<Link
									key={link.path}
									to={link.path}
									getActiveProps={propsOnLinkActive}>
									{link.title}
								</Link>
							))}
						</VStack>
					</Box>
				</Collapse>
			</Box>
		</Box>
	);
}
