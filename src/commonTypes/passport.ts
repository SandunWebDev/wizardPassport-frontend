import * as yup from 'yup';

export type TPassportData = {
	house: string;
	wand: string;
	patronus: string;
	bloodStatus: string;
};

export const passportDataSchema = yup
	.object({
		house: yup.string().required('Required'),
		wand: yup.string().required('Required'),
		patronus: yup.string().required('Required'),
		bloodStatus: yup.string().required('Required'),
	})
	.required();
