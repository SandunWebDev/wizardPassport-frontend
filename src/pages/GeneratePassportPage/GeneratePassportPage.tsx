import React, { useState } from 'react';

import { Box, Divider, Heading, Icon, Text, HStack } from '@chakra-ui/react';
import { FaWpforms as FaWpformsIcon } from 'react-icons/fa';

import backgroundOverlay_NightForestImgLink from '../../assets/images/backgroundOverlay_NightForest.svg';
import PageTemplate from '../../components/pageTemplates/PageTemplate/PageTemplate';
import { customStyleValues } from '../../configs/chakraThemeConfig';

import PassportPreview from './subComponents/PassportPreview/PassportPreview';
import PassportQuestionsForm from './subComponents/PassportQuestionsForm/PassportQuestionsForm';

export default function GeneratePassportPage() {
	const [currentStepNo, setStep] = useState(0);

	// Generic data for each step, about what to display.
	const perStepData = [
		{
			id: 0,
			title: 'Fill The Details',
			component: (
				<PassportQuestionsForm
					goToNextStep={() => setStep(currentStepNo + 1)}
				/>
			),
		},
		{
			id: 1,
			title: 'Share Your Passport',
			component: <PassportPreview />,
		},
	];

	const currentStepData = perStepData[currentStepNo];

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
				zIndex={1001} // Mostly to Popup Don't get Clipped from Footer.
				display='flex'
				alignItems='center'
				justifyContent='center'
				minHeight={`calc(100vh - ${customStyleValues.header.height}px)`}>
				{/* Actual Content Start Here */}
				<Box
					padding='25px'
					margin='40px 20px'
					background='rgba(255, 255, 255 ,0.7)'
					width={{ base: '100%', md: '700px' }}
					borderRadius='5px'>
					<Heading
						fontSize='2xl'
						fontWeight='500'
						letterSpacing='.7px'
						color='teal.600'>
						Let&apos;s Get Your Wizard Passport{' '}
					</Heading>

					{/* Step Data Line */}
					<Box margin='20px 0'>
						<Box display='flex' alignItems='center'>
							<Box flex='1'>
								<Box
									bg='teal.500'
									display='flex'
									alignItems='center'
									justifyContent='center'
									fontWeight='bold'
									width='40px'
									height='40px'
									borderRadius='100%'>
									<Icon as={FaWpformsIcon} color='white' fontSize='xl' />
								</Box>
							</Box>

							<HStack margin='0 15px' whiteSpace='nowrap'>
								<Text fontWeight='bold' fontSize='lg'>
									STEP {currentStepData.id + 1} :
								</Text>

								<Text>{currentStepData.title}</Text>
							</HStack>

							<Divider bg='gray.500' height='2px' top='50%' />
						</Box>
					</Box>

					<Box>{currentStepData.component}</Box>
				</Box>
			</Box>
		</PageTemplate>
	);
}
