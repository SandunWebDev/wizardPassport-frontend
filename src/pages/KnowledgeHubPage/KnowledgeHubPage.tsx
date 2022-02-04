import React from 'react';

import { Box, Heading, Image } from '@chakra-ui/react';

import backgroundOverlay_NightForestImgLink from '../../assets/images/backgroundOverlay_NightForest.svg';
import knowledgeHubPageComingSoonSvgLink from '../../assets/images/knowledgeHubPage_ComingSoon.svg';
import PageTemplate from '../../components/pageTemplates/PageTemplate/PageTemplate';
import { customStyleValues } from '../../configs/chakraThemeConfig';

export default function KnowledgeHubPage() {
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
					color='brand.background.primary'
					textAlign='center'
					padding='40px 20px'
					borderRadius='5px'
					width='100%'>
					<Image
						src={knowledgeHubPageComingSoonSvgLink}
						alt='Knowledge Hub Page Intro'
						width='100%'
						maxWidth='500px'
						margin='0 auto'
						marginBottom='20px'
					/>
					<Heading fontSize='3xl' color='teal.700' fontWeight='400'>
						Knowledge Hub
					</Heading>
					<Heading fontSize='xl' fontFamily='body' color='green.700'>
						Coming Soon
					</Heading>
				</Box>
			</Box>
		</PageTemplate>
	);
}
