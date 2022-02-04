import React from 'react';

import {
	Box,
	Heading,
	HStack,
	Icon,
	Image,
	Text,
	VStack,
} from '@chakra-ui/react';
import {
	FaGithub as FaGithubIcon,
	FaGoogle as FaGoogleIcon,
	FaTwitter as FaTwitterIcon,
} from 'react-icons/fa';
import { Link } from 'react-location';

import logo_DepartmentOfMagicalLawImgLink from '../../assets/images/logo_DepartmentOfMagicalLaw.jpg';
import logo_MinistryOfMagicImgLink from '../../assets/images/logo_MinistryOfMagic.jpg';
import { ReactComponent as MainLogoSvg } from '../../assets/images/mainLogo.svg';
import { headerLinks } from '../Header/Header';

export default function Footer() {
	return (
		<Box
			bg='brand.background.primary'
			color='brand.text.primary'
			zIndex={1000}
			className='Footer'>
			<Box layerStyle='pageContainer' paddingTop='30px'>
				<Box
					display='flex'
					flexWrap={{ base: 'wrap', md: 'nowrap' }}
					sx={{
						// Targeting all main section wrappers. (Authority, Links, CreatedBy)
						'& > div': {
							paddingBottom: '40px',
						},
					}}>
					{/* Authority Section */}
					<Box flex={1} order={1}>
						<Heading size='sm' fontWeight={100} marginBottom='15px'>
							AUTHORITY
						</Heading>

						<HStack>
							<Box
								width='50px'
								minWidth='50px'
								padding='3px'
								bg='white'
								borderRadius='4px'
								title='Wizard Passport Agency'>
								<MainLogoSvg
									style={{ fill: 'white' }}
									width='100%'
									height='100%'
								/>
							</Box>

							<Image
								src={logo_DepartmentOfMagicalLawImgLink}
								boxSize='50px'
								borderRadius='4px'
								title='Administrative Registration Department'
							/>

							<Image
								src={logo_MinistryOfMagicImgLink}
								boxSize='50px'
								borderRadius='4px'
								title='Ministry of Magic'
							/>
						</HStack>

						<Text marginTop='10px' whiteSpace='nowrap'>
							Level 2<br /> Administrative Registration Department
							<br /> Department of Magical Law Enforcement <br />
							Ministry of Magic
							<br /> Whitehall, London
							<br /> England, Great Britain
						</Text>
					</Box>

					{/* Links Section */}
					<Box
						flex={1}
						display='flex'
						justifyContent={{ base: 'left', md: 'center' }}
						flexBasis={{ base: '100%', md: 'auto' }}
						order={{ base: 3, md: 2 }}>
						<Box>
							<Heading size='sm' fontWeight='normal' marginBottom='10px'>
								LINKS
							</Heading>

							<VStack align='left'>
								{headerLinks.map((link) => (
									<Link key={link.path} to={link.path}>
										{link.title}
									</Link>
								))}
							</VStack>
						</Box>
					</Box>

					{/* CreatedBy Section */}
					<Box
						flex={{ base: 1, sm: 1, md: 1 }}
						display='flex'
						order={{ base: 2, md: 3 }}
						justifyContent={{ base: 'left', sm: 'end' }}
						flexBasis={{ base: '100%', sm: 'auto' }}>
						<Box>
							<Heading size='sm' fontWeight={100} marginBottom='10px'>
								CREATED BY
							</Heading>

							<HStack align='left'>
								<Text>Powerful Wizard </Text>
								<Text fontWeight='bold'>
									<a href='mailto:SandunWebDev@gmail.com'>SandunWebDev</a>
								</Text>
							</HStack>

							<HStack spacing='15px' marginTop='5px'>
								<a href='mailto:SandunWebDev@gmail.com'>
									<Icon as={FaGoogleIcon} boxSize='30px' />
								</a>

								<a
									href='https://github.com/SandunWebDev'
									target='_blank'
									rel='noreferrer'>
									<Icon as={FaGithubIcon} boxSize='30px' />
								</a>

								<a
									href='https://twitter.com/SandunWebDev'
									target='_blank'
									rel='noreferrer'>
									<Icon as={FaTwitterIcon} boxSize='30px' />
								</a>
							</HStack>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
