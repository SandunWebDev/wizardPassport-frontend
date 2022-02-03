import React, { useRef, useState } from 'react';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Center,
	IconButton,
} from '@chakra-ui/react';
import { Link, useMatch } from 'react-location';

import backgroundOverlay_NightForestImgLink from '../../assets/images/backgroundOverlay_NightForest.svg';
import { passportDataSchema, TPassportData } from '../../commonTypes/passport';
import PageTemplate from '../../components/pageTemplates/PageTemplate/PageTemplate';
import Passport from '../../components/Passport/Passport';
import { customStyleValues } from '../../configs/chakraThemeConfig';
import { decodeEncodedBase64UrlToValue } from '../../utilities/encodingUtilities';
import PassportShareToolbar from '../GeneratePassportPage/subComponents/PassportShareToolbar/PassportShareToolbar';

type TMyPassportPageCommonProps = {
	passportWrapperElem: React.MutableRefObject<null>; // Ref for Div Wrapper around <Passport/> component. (// We need this, Because direct "passportElem" reference doesn't work with "downloadElementAsImage() / html2canvas")
	passportElem: React.MutableRefObject<null>; // Ref for direct <Passport/> component.
	passportData: TPassportData;
};

function MyPassportPageNormalView(props: TMyPassportPageCommonProps) {
	const { passportWrapperElem, passportElem, passportData } = props;

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
				width='100%'
				minHeight={`calc(100vh - ${customStyleValues.header.height}px)`}>
				<Box
					width='100%'
					maxWidth='700px'
					padding='25px'
					paddingTop='50px'
					background='rgba(255, 255, 255 ,0.7)'
					borderRadius='5px'
					margin='40px auto'>
					<Box>
						<Box display='flex' justifyContent='center'>
							<Box
								id='wizardPassportWrapper'
								ref={passportWrapperElem}
								width='100%'
								maxWidth='500px'>
								<Passport ref={passportElem} {...passportData} />
							</Box>
						</Box>

						{/* <PassportShareToolbar/> Desktop View */}
						<Box
							display={{ base: 'none', md: 'flex' }}
							justifyContent='center'
							marginTop='20px'
							padding='20px 15px 15px 15px'
							borderRadius='4px'>
							<PassportShareToolbar
								type='horizontal'
								passportWrapperElem={passportWrapperElem}
								passportElem={passportElem}
								passportData={passportData}
							/>
						</Box>

						{/* <PassportShareToolbar/> Mobile View */}
						<Box
							display={{ base: 'flex', md: 'none' }}
							justifyContent='center'
							marginTop='20px'>
							<PassportShareToolbar
								type='verticalDrawer'
								passportWrapperElem={passportWrapperElem}
								passportElem={passportElem}
								passportData={passportData}
								verticalDrawerTypeProps={{
									togglerProps: { size: 'lg' },
								}}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</PageTemplate>
	);
}

function MyPassportPageIFrameView(props: TMyPassportPageCommonProps) {
	const { passportWrapperElem, passportElem, passportData } = props;

	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			minHeight='100vh'>
			<Box pos='relative' width='500px' bg='red'>
				<Box
					id='wizardPassportWrapper'
					ref={passportWrapperElem}
					width='100%'
					maxWidth='500px'>
					<Passport ref={passportElem} {...passportData} />
				</Box>

				<Box justifyContent='center' pos='absolute' top='25px' right='10px'>
					<PassportShareToolbar
						type='verticalDrawer'
						passportWrapperElem={passportWrapperElem}
						passportElem={passportElem}
						passportData={passportData}
						verticalDrawerTypeProps={{
							toggler: (
								<IconButton
									title='Menu'
									size='sm'
									colorScheme='teal'
									icon={<HamburgerIcon />}
									aria-label='Menu Toggle'
								/>
							),
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
}

export default function MyPassportPage() {
	const { search: searchParams } = useMatch();
	const { encodedPassportData, isIFrame = false } = searchParams;

	const passportElem = useRef(null);
	const passportWrapperElem = useRef(null); // We need this, Because direct "passportElem" reference doesn't work with "downloadElementAsImage() / html2canvas"

	// Tracking error occurred while decoding/validating the passport data.
	const [isError, setError] = useState<boolean | string>(false);

	// Decoding and Validating the passport data.
	let decodedPassportData: TPassportData | null = null;
	try {
		if (!isError) {
			decodedPassportData = decodeEncodedBase64UrlToValue(
				encodedPassportData as string,
			) as TPassportData;

			// If invalid error will be thrown.
			passportDataSchema.validateSync(decodedPassportData);
		}
	} catch {
		setError('Invalid Passport Data Provided. Please Check and Try Again.');
	}

	if (isError) {
		return (
			<Center minHeight='100vh'>
				<Alert
					status='error'
					variant='subtle'
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
					textAlign='center'
					height='200px'
					background='none'>
					<AlertIcon boxSize='40px' mr={0} />
					<AlertTitle mt={4} mb={1} fontSize='lg'>
						Error Occurred
					</AlertTitle>
					<AlertDescription maxWidth='sm'>
						<Box>{isError}</Box>

						<Box
							marginTop='10px'
							display='flex'
							alignItems='center'
							justifyContent='center'>
							<Button
								colorScheme='teal'
								onClick={() => {
									window.location.reload();
								}}>
								REFRESH PAGE
							</Button>

							<Box marginLeft='10px'>
								<Link to='/'>
									<Button colorScheme='blue'>HOME PAGE</Button>
								</Link>
							</Box>
						</Box>
					</AlertDescription>
				</Alert>
			</Center>
		);
	}

	if (decodedPassportData !== null) {
		return isIFrame ? (
			<MyPassportPageIFrameView
				passportWrapperElem={passportWrapperElem}
				passportElem={passportElem}
				passportData={decodedPassportData}
			/>
		) : (
			<MyPassportPageNormalView
				passportWrapperElem={passportWrapperElem}
				passportElem={passportElem}
				passportData={decodedPassportData}
			/>
		);
	} else {
		return null;
	}
}
