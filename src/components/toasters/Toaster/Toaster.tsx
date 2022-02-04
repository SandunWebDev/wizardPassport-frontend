import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	CloseButton,
	Box,
} from '@chakra-ui/react';
import {
	toast as reactHotToast,
	Toaster as ReactHotToaster,
	ToasterProps,
	ToastOptions,
	ValueOrFunction,
	Renderable,
	Toast,
} from 'react-hot-toast';

import { customStyleValues } from '../../../configs/chakraThemeConfig';

/**
  NOTE : As of now, By default "react-hot-toast" only support "success" and "error" styled toasts.
         But since we need more options like "info/warn/..." styled toast too, In here we have manually extended things to support those versions and support custom toast output. (Ex. Using ChakraUI Alerts)

         In "Usage" viewpoint, you just have to know to import "toast" value from this file and just use like before, wherever you need.
         Ex. import { toast } from '../../../components/toasters/Toaster/Toaster';
             toast.info("Hello World", {delay: 2000})

         In "General Toast Configs/Types" viewpoint all configs, defaults, types are in this file. So any general things to be need to changed, this is the file.
 */

// Pre-configured Toast Provider. Normally used in 'index.js' similar to ReactRouter.
export function ConfiguredReactHotToasterProvider(props: ToasterProps) {
	return (
		<ReactHotToaster
			reverseOrder // New toast should be added to end.
			toastOptions={{
				position: 'top-right',
			}}
			containerStyle={{
				// Manually offsetting Toast Container to show toast below the Header.
				position: 'fixed',
				top: `${customStyleValues.header.height + 20}px`, // Header(70px) + Margin(20px)
				right: '15px',
			}}
			{...props}
		/>
	);
}

// Our own custom options  that can be provided in "options" parameter of "toast" function.
// Ex. toast.info("Hello", {customOptions: {title: "HI"}})
type OurCustomToastOptions = {
	customOptions?: {
		title?: string;
	};
};

// ChakraUI Alert Types.
type AlertTypes = 'success' | 'info' | 'warning' | 'error';

type BaseToastMessageRenderProps = {
	alertType: AlertTypes;
	message: ValueOrFunction<Renderable, Toast>;
	options?: ToastOptions & OurCustomToastOptions;
	t: Toast;
};

// Generic component to render custom Toast Content.
function BaseToastMessageRender(props: BaseToastMessageRenderProps) {
	const { alertType = 'success', message, options = {}, t } = props;
	const { customOptions } = options;

	return (
		<Alert
			variant='left-accent'
			status={alertType}
			width='auto'
			paddingLeft='20px'
			minWidth='200px'
			maxWidth='500px'>
			<AlertIcon />

			<Box flex='1'>
				{customOptions?.title && <AlertTitle>{customOptions.title}</AlertTitle>}
				<AlertDescription display='block'>{message}</AlertDescription>
			</Box>

			<CloseButton
				size='sm'
				marginTop='-1px'
				marginLeft='10px'
				onClick={() => reactHotToast.dismiss(t.id)}
			/>
		</Alert>
	);
}

type ToastCreatorFuncType = (
	message: ValueOrFunction<Renderable, Toast>,
	options?: ToastOptions & OurCustomToastOptions,
) => string;

type CustomToastTypeCreatorCreateOptions = {
	alertType: AlertTypes;
};

// Helper function, That return function to toggle specific type of toast.
const customToastTypeCreator = (
	createOptions: CustomToastTypeCreatorCreateOptions,
): ToastCreatorFuncType => {
	const { alertType } = createOptions;

	return (message, options) => {
		return reactHotToast.custom(
			(t) => {
				return (
					<BaseToastMessageRender
						alertType={alertType}
						message={message}
						options={options}
						t={t}
					/>
				);
			},
			{ ...options },
		);
	};
};

type OurCustomToastType = {
	success: ToastCreatorFuncType;
	info: ToastCreatorFuncType;
	warning: ToastCreatorFuncType;
	error: ToastCreatorFuncType;
};

// These are the actual custom toast types, That can be used anywhere.
// In simple sense there are improved/customized versions of original toasts and some new ones.
const customToastType: OurCustomToastType = {
	success: customToastTypeCreator({ alertType: 'success' }),
	info: customToastTypeCreator({ alertType: 'info' }),
	warning: customToastTypeCreator({ alertType: 'warning' }),
	error: customToastTypeCreator({ alertType: 'error' }),
};

const toast = {
	...reactHotToast,
	...customToastType,
};

export { toast };
