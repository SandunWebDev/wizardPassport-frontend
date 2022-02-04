import React from 'react';

import { Box, Heading, Image, Text } from '@chakra-ui/react';

import aboutPageIntroSvgLink from '../../assets/images/aboutPage_Intro.svg';
import backgroundOverlay_NightForestImgLink from '../../assets/images/backgroundOverlay_NightForest.svg';
import mainLogoSvgLink from '../../assets/images/mainLogo.svg';
import PageTemplate from '../../components/pageTemplates/PageTemplate/PageTemplate';
import { customStyleValues } from '../../configs/chakraThemeConfig';

export default function AboutPage() {
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
				minHeight={`calc(100vh - ${customStyleValues.header.height}px)`}
				width='100%'>
				<Box
					background='rgba(255, 255, 255 ,0.7)'
					padding='50px 60px'
					borderRadius='5px'
					width='100%'
					margin='40px 0'>
					<Heading
						fontSize='3xl'
						fontWeight='400'
						marginBottom='30px'
						marginLeft='-60px'
						padding='10px 20px 5px 60px'
						borderRadius='0 50px 50px 0'
						color='white'
						bg='teal.700'>
						ABOUT
					</Heading>

					<Box color='teal.700' fontSize='xl'>
						<Image
							src={aboutPageIntroSvgLink}
							alt='About Page Intro Image'
							width='100%'
							maxWidth='500px'
							margin='0 auto'
							marginBottom='20px'
							marginTop={{ base: '-20px', md: '-10px' }}
						/>

						<Box
							display='flex'
							flexWrap={{ base: 'wrap', md: 'nowrap' }}
							alignItems='center'
							gap='20px'>
							<Image
								src={mainLogoSvgLink}
								alt='Wizard Passport Logo'
								width='100%'
								maxWidth='100px'
								margin={{ base: '0 auto', md: '0' }}
							/>
							<Text>
								This is a fun project created around Harry Potter, Wizard
								Universe to share your love for Harry Potter in a fun way with
								friends. You can choose things like Hogwarts House, Wand Type,
								Pertonus Type, Etc... and generate a custom &quot;Wizard
								Passport&quot; based on them. Then the generated &quot;Wizard
								Passport&quot; can be Shared, Downloaded, Viewed in multiple
								ways. The app is currently in the early beta phase, More
								features are coming in future. Stay Tuned.
							</Text>
						</Box>

						<Box margin='30px 0'>
							<Text marginBottom='20px'>
								Let &apos;s see a live Example. Just like this yours can be
								Embedded in your Website, Markdown File. Or just directly
								Download it as Image File. Maybe directly Share it on Social
								Media too. So why waiting? Get yours today.{' '}
							</Text>

							<Image
								margin='0 auto'
								alt='Wizard Passport Example'
								src='https://wizardpassport.vercel.app/api/passport-as-svg/?encodedPassportData=eyJob3VzZSI6IkdyeWZmaW5kb3IiLCJ3YW5kIjoiRHJhZ29uIEhlYXJ0c3RyaW5nIiwicGF0cm9udXMiOiJGYWxjb24iLCJibG9vZFN0YXR1cyI6Ik11Z2dsZSBCb3JuIn0='
							/>
						</Box>

						<Box
							paddingTop='20px'
							marginTop='100px'
							borderTop='1px solid'
							borderTopColor='teal.700'
							sx={{
								'& p': {
									marginBottom: '10px',
								},
							}}>
							<Text fontWeight='bold'>
								DISCLAIMER : FAIR USAGE & NON-COMMERCIAL
							</Text>

							<Text>
								Copyright Disclaimer Under Section 107 of the Copyright Act in
								1976; Allowance is made for &quot;Fair Use&quot; for purposes
								such as criticism, comment, news reporting, teaching,
								scholarship, and research. Fair use is a use permitted by
								copyright statute that might otherwise be infringing.
								Non-profit, educational or personal use tips the balance in
								favor of fair use.
							</Text>

							<Text>
								In simple terms, This is a non-commercial project created for
								educational purposes to learn and explore New Web Technologies
								along with it.
							</Text>

							<Text>
								All rights and credit go directly to its rightful owners. No
								copyright infringement intended.
							</Text>
						</Box>
					</Box>
				</Box>
			</Box>
		</PageTemplate>
	);
}
