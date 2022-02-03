import React, { useRef, useState } from 'react';

import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
} from '@chakra-ui/react';
import shallow from 'zustand/shallow';

import { passportDataSchema } from '../../../../commonTypes/passport';
import Passport from '../../../../components/Passport/Passport';
import { useStore } from '../../../../globalStore/globalStore';
import PassportShareToolbar from '../PassportShareToolbar/PassportShareToolbar';

export default function PassportPreview() {
	// Getting "User Inputted Data" on previous step from Zustand store.
	const { generatePassportPageSlice } = useStore(
		(store) => ({
			generatePassportPageSlice: store.generatePassportPage.state,
		}),
		shallow,
	);

	const { inputtedPassportFormData } = generatePassportPageSlice;

	// References for "<Passport/>" component.
	const passportElem = useRef(null);
	const passportWrapperElem = useRef(null);

	// Tracking error occurred while decoding/validating the passport data.
	const [isError, setError] = useState<boolean | string>(false);

	// Validating the passport data.
	try {
		if (!isError) {
			// If invalid error will be thrown.
			passportDataSchema.validateSync(inputtedPassportFormData);
		}
	} catch {
		setError(
			'Invalid Passport Data Provided. Please Refresh Page and Try Again.',
		);
	}

	if (isError) {
		return (
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

					<Box marginTop='10px'>
						<Button
							colorScheme='teal'
							onClick={() => {
								window.location.reload();
							}}>
							REFRESH PAGE
						</Button>
					</Box>
				</AlertDescription>
			</Alert>
		);
	}

	if (inputtedPassportFormData !== null) {
		return (
			<Box>
				<Box
					id='wizardPassportWrapper'
					ref={passportWrapperElem}
					style={{ maxWidth: '500px', margin: '0 auto' }}>
					<Passport ref={passportElem} {...inputtedPassportFormData} />
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
						passportData={inputtedPassportFormData}
					/>
				</Box>

				{/* <PassportShareToolbar/> Mobile View */}
				<Box
					display={{ base: 'flex', md: 'none' }}
					justifyContent='flex-end'
					marginTop='20px'>
					<PassportShareToolbar
						type='verticalDrawer'
						passportWrapperElem={passportWrapperElem}
						passportElem={passportElem}
						passportData={inputtedPassportFormData}
						verticalDrawerTypeProps={{
							togglerProps: { size: 'lg' },
						}}
					/>
				</Box>
			</Box>
		);
	} else {
		return null;
	}
}
