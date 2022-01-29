import React, { useState } from 'react';

import { Box, HStack, Icon, Spinner } from '@chakra-ui/react';
import { Offline } from 'react-detect-offline';
import { RiWifiOffLine as RiWifiOffLineIcon } from 'react-icons/ri';
import { useIsFetching, useIsMutating } from 'react-query';

import { toast } from '../../toasters/Toaster/Toaster';

export default function WebStatusIndicators() {
	const isAnyFetchingReq = useIsFetching();
	const isAnyMutatingReq = useIsMutating();
	const isAnyBackgroundReq = isAnyFetchingReq || isAnyMutatingReq;

	const [isOnlineState, setIsOnlineState] = useState(true);

	const isSomethingToRender = !isOnlineState || isAnyBackgroundReq;

	return (
		<Box
			position='fixed'
			bottom='5'
			right='5'
			zIndex='1000'
			color='white'
			bg='rgba(0,0,0,0.7)'
			padding={isSomethingToRender ? '5px' : 0}
			borderRadius='4px'>
			<HStack spacing='15px'>
				{/* If any Req. happen using React Query. */}
				{isAnyBackgroundReq ? (
					<Spinner title='Some background fetching are in progress.' />
				) : null}

				{/* When device is Offline */}
				<Offline
					onChange={(isOnline) => {
						if (isOnline) {
							toast.info('You are back Online.');
						} else {
							toast.warning('You are Offline.');
						}

						setIsOnlineState(isOnline);
					}}>
					<Icon as={RiWifiOffLineIcon} boxSize={6} title='Offline' />
				</Offline>
			</HStack>
		</Box>
	);
}
