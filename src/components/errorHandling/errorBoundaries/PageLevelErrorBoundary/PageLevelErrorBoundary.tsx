import React from 'react';

import { Button } from '@chakra-ui/react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import ErrorPage500 from '../../customErrorStatusPages/ErrorPage500';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	// SIDE-NOTE : Note that we are using native browser API such as "window.location.reload/href" instead of React Location Router.
	//             Because we have to refresh all internal states of components, that error happened, So we do hard refresh to start fresh.
	//             But If we want more fine-grade approach, (Like only resetting Redux State) We will have to use "resetErrorBoundary" approach. See Docs.

	return (
		<ErrorPage500
			error={error}
			additionalErrorDetails='Error is caught in Root Error Boundary'
			customButtonsList={
				<>
					<Button
						onClick={() => {
							window.location.reload();
						}}>
						REFRESH PAGE
					</Button>

					<Button
						onClick={() => {
							window.location.href = '/';
						}}>
						GOTO HOME
					</Button>
				</>
			}
		/>
	);
}

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
	// Do something with the error. (	Ex: Log to an error logging client.)
	console.log('ERROR CACHED IN ERROR BOUNDARY : \n', error.message, info);
};

type MainErrorBoundaryProps = {
	children: React.ReactNode;
};

export default function MainErrorBoundary({
	children,
}: MainErrorBoundaryProps) {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => {
				// We can invoke "resetErrorBoundary" from "FallbackComponent". When invoked this function will be fired.
				// Example Use Case : Reset the state of your app so the error doesn't happen again.
			}}
			onError={myErrorHandler}>
			{children}
		</ErrorBoundary>
	);
}
