import React from 'react';

import {
	Heading,
	Image,
	VStack,
	Center,
	Button,
	ButtonGroup,
	Text,
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
} from '@chakra-ui/react';
import Draggable from 'react-draggable';
import { AiFillHome as AiFillHomeIcon } from 'react-icons/ai';
import { IoMdArrowRoundBack as IoMdArrowRoundBackIcon } from 'react-icons/io';
import { useNavigate } from 'react-location';

import errorPage500IllustrationPath from '../../../../assets/images/errorPage500_Illustration.svg';
import globalValues from '../../../../configs/globalValues';
import { routerHistory } from '../../../../routes/routerHistory';
import PageTemplate, {
	TemplateTypes,
} from '../../../pageTemplates/PageTemplate/PageTemplate';

type DevelopmentErrorViewerProps = {
	error: Error | undefined;
	additionalErrorDetails?: string;
};

// Helper component to show additional details about error in development mode. (For Developers)
function DevelopmentErrorViewer({
	error,
	additionalErrorDetails,
}: DevelopmentErrorViewerProps) {
	const isDevelopment = globalValues.environment.IS_DEVELOPMENT;

	const errorMessage =
		error instanceof Error ? error.message : 'NO ERROR MESSAGE';
	const errorStack = error instanceof Error ? error.stack : 'NO ERROR STACK';

	if (!isDevelopment) {
		return null;
	}

	return (
		<Draggable>
			<Box
				pos='absolute'
				bottom='5'
				right='5'
				zIndex='5000'
				bg='black'
				width='500px'
				color='white'
				border='1px solid'>
				<Alert
					bg='gray.600'
					status='error'
					variant='subtle'
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
					textAlign='center'
					height='150px'>
					<AlertIcon boxSize='40px' mr={0} />
					<AlertTitle mt={4} mb={1} fontSize='lg'>
						ADDITIONAL ERROR INFO FOR DEVELOPERS
					</AlertTitle>
					<AlertDescription maxWidth='sm'>{errorMessage}</AlertDescription>
				</Alert>

				<Accordion allowToggle>
					<AccordionItem>
						<h2>
							<AccordionButton>
								<Box flex='1' textAlign='left'>
									ERROR STACK
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>{errorStack}</AccordionPanel>
					</AccordionItem>

					<AccordionItem>
						<h2>
							<AccordionButton>
								<Box flex='1' textAlign='left'>
									MORE DETAILS
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							{additionalErrorDetails || 'N/A'}
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</Box>
		</Draggable>
	);
}

export type PageLevelErrorProps = {
	pageTemplateType?: TemplateTypes;
	statusCode?: string | number;
	title?: string | React.ReactNode;
	subTitle?: string | React.ReactNode;
	imageSrc?: string;
	customButtonsList?: React.ReactNode;

	error?: Error;
	additionalErrorDetails?: string;
};

export default function PageLevelError(props: PageLevelErrorProps) {
	const {
		pageTemplateType = 'default',
		statusCode = 500,
		title = 'UNEXPECTED ERROR OCCURRED WHILE PERFORMING YOUR MAGIC SPELL',
		subTitle = '',
		imageSrc = errorPage500IllustrationPath,
		customButtonsList, // Can be used to override, default buttons and add our own buttons.

		error,
		additionalErrorDetails, // Developers, Can used to display additional details about Error in DevelopmentErrorViewer.
	} = props;

	const navigate = useNavigate();

	return (
		<PageTemplate type={pageTemplateType}>
			<Center flex='1' margin='60px 0' pos='relative'>
				<VStack>
					<Heading as='h1' fontSize='10rem' marginBottom='-30px' color='white'>
						{statusCode}
					</Heading>

					<Heading as='h3' size='md' color='white'>
						{title}
					</Heading>

					{subTitle && (
						<Text fontSize='xl' color='white'>
							{subTitle}
						</Text>
					)}

					<DevelopmentErrorViewer
						error={error}
						additionalErrorDetails={additionalErrorDetails}
					/>

					<Image src={imageSrc} maxWidth='500px' width='100%' />

					<ButtonGroup>
						{customButtonsList || (
							<>
								<Button
									leftIcon={
										<IoMdArrowRoundBackIcon style={{ marginTop: '-1px' }} />
									}
									onClick={() => {
										routerHistory.back();
									}}>
									GO BACK
								</Button>

								<Button
									leftIcon={<AiFillHomeIcon style={{ marginTop: '-1px' }} />}
									onClick={() => {
										navigate({ to: '/' });
									}}>
									HOME
								</Button>
							</>
						)}
					</ButtonGroup>
				</VStack>
			</Center>
		</PageTemplate>
	);
}
