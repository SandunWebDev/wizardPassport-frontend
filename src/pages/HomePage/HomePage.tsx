import React from 'react';

import { Box, Heading, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';
import shallow from 'zustand/shallow';

import { toast } from '../../components/toasters/Toaster/Toaster';
import { useStore } from '../../globalStore/globalStore';

export default function HomePage() {
	const {
		userPreferencesSlice,
		userPreferencesSliceActions,

		houseName,
		setHouse,
	} = useStore(
		(store) => ({
			userPreferencesSlice: store.userPreferences.state,
			userPreferencesSliceActions: store.userPreferences.actions,

			houseName: store.generatePassportPage.state.house,
			setHouse: store.generatePassportPage.actions.setHouse,
		}),
		shallow,
	);

	const { undo, redo } = useStore();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	const result = useQuery(
		'houses',
		async () => {
			return axios.get(
				`http://hp-api.herokuapp.com/api/characters/house/slytherin`,
			);
		},
		{ useErrorBoundary: true },
	);

	return (
		<Box>
			<Heading>Wizard Passport</Heading>
			<Text fontFamily='fancy' fontSize='70'>
				Hi Muggle Wizards
			</Text>
			<Text>Get your Wizard Passport, Today</Text>
			<Button
				onClick={() => {
					toast.success('SUCCESS');
					toast.info('INFO');
					toast.warning('WARNING');
					toast.error('ERROR');
				}}>
				FIRE
			</Button>

			<Text>COLOR MODE {userPreferencesSlice.colorMode}</Text>
			<Button
				onClick={() => {
					const colorMode =
						userPreferencesSlice.colorMode === 'light' ? 'dark' : 'light';

					userPreferencesSliceActions.setColorMode(colorMode);
				}}>
				TOGGLE COLOR MODE
			</Button>

			<Text>HOUSE {houseName}</Text>
			<Button
				onClick={() => {
					setHouse('Hogwarts');
				}}>
				XXX
			</Button>

			<Button
				onClick={() => {
					if (undo !== undefined) {
						undo();
					}
				}}>
				UNDO
			</Button>
			<Button
				onClick={() => {
					if (redo !== undefined) {
						redo();
					}
				}}>
				REDO
			</Button>
		</Box>
	);
}
