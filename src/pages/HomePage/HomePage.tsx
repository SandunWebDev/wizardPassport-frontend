import React from 'react';

import { AddIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Flex,
	Heading,
	Image,
	Text,
	VStack,
} from '@chakra-ui/react';
import { Link } from 'react-location';

import backgroundOverlay_NightForestImgLink from '../../assets/images/backgroundOverlay_NightForest.svg';
import homePageHeroImageLink from '../../assets/images/homePageHeroImage.svg';
import PageTemplate from '../../components/pageTemplates/PageTemplate/PageTemplate';
import { customStyleValues } from '../../configs/chakraThemeConfig';

export default function HomePage() {
	return (
		<PageTemplate type='default'>
			{/* Background Image Overlay  */}
			<Box
				backgroundImage={backgroundOverlay_NightForestImgLink}
				backgroundSize='cover'
				filter='opacity(0.6) grayscale(75%) '
				pos='absolute'
				width='100%'
				top={0}
				bottom={0}
				minHeight={`calc(100vh - ${customStyleValues.header.height}px)`}
				zIndex={1}
			/>

			<Box
				layerStyle='pageContainer'
				zIndex={100}
				display='flex'
				alignItems='center'
				minHeight={`calc(100vh - ${customStyleValues.header.height}px)`}>
				<Box>
					<Flex
						flexWrap={{ base: 'wrap', md: 'nowrap' }}
						align='center'
						justify='center'
						width='100%'
						textAlign={{ base: 'center', md: 'left' }}
						padding={{ base: '30px 0', sm: '40px 50px' }}>
						<Box flex={1} color='brand.text.primary' maxWidth='400px'>
							<VStack align='left' spacing='5' lineHeight='1.7rem'>
								<Heading size='lg' color='brand.text.heading2' fontWeight='100'>
									Hi Muggles, <br />
									Now you too can get
								</Heading>

								<Heading size='4xl' color='brand.text.heading1'>
									Wizard <br />
									Passport
								</Heading>

								<Text fontSize='xl'>
									Ministry of Magic decided to allow, Issuing of Wizard Passport
									for Muggles. It is a Temporary Basis Passport, Which you can
									show or share among other muggles, to show your status on
									Potter Universe. In future you may also able to use this
									passport to visit Wizarding World as tourist.
								</Text>

								<Link to='/generate-passport/new'>
									<Button
										size='lg'
										rightIcon={<AddIcon />}
										colorScheme={customStyleValues.buttons.primary.colorScheme}
										fontSize='xl'
										padding='25px 35px'>
										Let&apos;s Get My Wizard Passport
									</Button>
								</Link>
							</VStack>
						</Box>

						<Box margin='20px 0 20px 40px'>
							<Image src={homePageHeroImageLink} />
						</Box>
					</Flex>
				</Box>
			</Box>
		</PageTemplate>
	);
}
