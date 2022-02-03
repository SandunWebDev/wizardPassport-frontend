import React from 'react';

import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
} from '@chakra-ui/react';
import lodash from 'lodash';
import { Control, useController } from 'react-hook-form';

type TReactHookFormInputWrapperProps = {
	name: string;
	children: React.ReactNode; // Actual InputComponent should be passed in here.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control?: Control<any>; // If our component used within "<FormProvider/>",  "control" prop will be automatically fetched, If not explicitly pass it.

	label?: React.ReactNode | string;
	helperText?: React.ReactNode | string;
};

type TPropsForUseControllerHook = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control?: Control<any>;
};

export default function ReactHookFormInputWrapper(
	props: TReactHookFormInputWrapperProps,
) {
	const { name, children, control, label, helperText } = props;

	// If our component used within "<FormProvider/>",  "control" prop will be automatically fetched.
	// But If its explicitly passed, in here we use it.
	const propsForUseControllerHook: TPropsForUseControllerHook = {};
	if (control) {
		propsForUseControllerHook.control = control;
	}

	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	const { field, fieldState, formState } = useController({
		name,
		...propsForUseControllerHook,
	});

	// Passing more related props (Ex. onChange,...) to InputComponent that passed as children.
	let inputCompWithMoreProps = null;
	if (React.isValidElement(children)) {
		inputCompWithMoreProps = React.cloneElement(children, {
			id: field.name,
			...field,
		});
	}

	const defaultLabel = lodash.startCase(lodash.camelCase(field.name));
	const inputLabel = label || defaultLabel;

	return (
		<FormControl isInvalid={fieldState.invalid}>
			<FormLabel htmlFor={field.name}>{inputLabel}</FormLabel>
			{inputCompWithMoreProps}
			<FormHelperText>{helperText}</FormHelperText>
			<FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
		</FormControl>
	);
}
