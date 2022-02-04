import React, { useEffect } from 'react';

import { Box, Button, Select, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineHeatMap as AiOutlineHeatMapIcon } from 'react-icons/ai';
import shallow from 'zustand/shallow';

import {
	passportDataSchema,
	TPassportData,
} from '../../../../commonTypes/passport';
import ReactHookFormInputWrapper from '../../../../components/ReactHookFormInputWrapper/ReactHookFormInputWrapper';
import {
	bloodStatusTypes,
	houseTypes,
	patronusTypes,
	wandTypes,
} from '../../../../data/potterUniverseData';
import { useStore } from '../../../../globalStore/globalStore';

type TPassportQuestionsFormProps = {
	goToNextStep: () => void;
};

const defaultFormValues: TPassportData = {
	house: '',
	wand: '',
	patronus: '',
	bloodStatus: '',
};

export default function PassportQuestionsForm(
	props: TPassportQuestionsFormProps,
) {
	// Creating "React Hook Form"
	const useFormProps = useForm<TPassportData>({
		defaultValues: defaultFormValues,
		resolver: yupResolver(passportDataSchema), // Custom Yup Validator
	});

	const { handleSubmit } = useFormProps;

	// Accessing Zustand Store.
	const { generatePassportPageSliceActions } = useStore(
		(store) => ({
			generatePassportPageSliceActions: store.generatePassportPage.actions,
		}),
		shallow,
	);

	const { setInputtedPassportFormData, clearInputtedPassportFormData } =
		generatePassportPageSliceActions;

	// Prop that will be passed from "<GeneratePassportPage>".
	const { goToNextStep } = props;

	// Handler that will be called when form is submitted.
	const onSubmit: SubmitHandler<TPassportData> = (data) => {
		setInputtedPassportFormData(data);
		goToNextStep();
	};

	// When "componentDidMount", Clearing existing data on Zustand Store.
	useEffect(() => {
		clearInputtedPassportFormData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Default props that will be used for all <Select> components.
	const defaultSelectProps = {
		variant: 'filled',
		size: 'md',
		_focus: {
			background: 'white',
		},
	};

	return (
		<Box
			sx={{
				// Each Input Wrapper Set (<ReactHookFormInputWrapper/>)
				'& form > div': {
					marginBottom: '15px',
				},

				// Each <FormLabel/> in <ReactHookFormInputWrapper/>
				'& label': {
					fontSize: '16px',
				},

				// Each <FormErrorMessage/> and <FormHelperText/> in <ReactHookFormInputWrapper/>
				' & .chakra-form__error-message, & .chakra-form__helper-text': {
					fontSize: '14px',
					marginTop: '0px',
				},
			}}>
			<FormProvider {...useFormProps}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ReactHookFormInputWrapper name='house'>
						<Select placeholder='Select House' {...defaultSelectProps}>
							{houseTypes.map((house) => (
								<option key={house}>{house}</option>
							))}
						</Select>
					</ReactHookFormInputWrapper>

					<ReactHookFormInputWrapper name='wand'>
						<Select placeholder='Select Wand' {...defaultSelectProps}>
							{wandTypes.map((wand) => (
								<option key={wand}>{wand}</option>
							))}
						</Select>
					</ReactHookFormInputWrapper>

					<ReactHookFormInputWrapper name='patronus'>
						<Select placeholder='Select Patronus' {...defaultSelectProps}>
							{patronusTypes.map((patronus) => (
								<option key={patronus}>{patronus}</option>
							))}
						</Select>
					</ReactHookFormInputWrapper>

					<ReactHookFormInputWrapper name='bloodStatus'>
						<Select placeholder='Select Blood Status' {...defaultSelectProps}>
							{bloodStatusTypes.map((bloodStatus) => (
								<option key={bloodStatus}>{bloodStatus}</option>
							))}
						</Select>
					</ReactHookFormInputWrapper>

					<Box
						display='flex'
						justify='right'
						marginTop='25px'
						marginBottom='0 !important'>
						<Button
							type='submit'
							rightIcon={<AiOutlineHeatMapIcon />}
							size='lg'
							colorScheme='teal'
							marginLeft='auto'>
							Generate
						</Button>
					</Box>

					<Text>NOTE: Lot more options are coming soon.</Text>
				</form>
			</FormProvider>
		</Box>
	);
}
