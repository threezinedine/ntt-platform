import type { Meta, StoryObj } from '@storybook/react';

import Form from '.';
import { FormData } from './props';
import lengthValidator from './validators/lengthValidator';

const meta = {
	component: Form,
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		onSubmit: (data: FormData) => {
			console.log(data);
		},
		fields: [
			{
				label: 'Name',
				name: 'name',
				placeholder: 'Enter your name',
				type: 'text',
				validators: [lengthValidator(5, 20)],
			},
			{
				label: 'Email',
				name: 'email',
				placeholder: 'Enter your email',
				type: 'email',
				validators: [],
			},
			{
				label: 'Password',
				name: 'password',
				placeholder: 'Enter your password',
				type: 'password',
				validators: [lengthValidator(8, 20)],
			},
			{
				label: 'Age',
				name: 'age',
				placeholder: 'Enter your age',
				type: 'number',
				validators: [],
			},
			{
				label: 'Birthday',
				name: 'birthday',
				placeholder: 'Enter your birthday',
				type: 'date',
				validators: [],
			},
			{
				label: 'Gender',
				name: 'gender',
				type: 'select',
				options: ['Male', 'Female', 'Other'],
				validators: [],
			},
			{
				label: 'Agree',
				name: 'agree',
				type: 'checkbox',
				validators: [],
			},
			{
				label: 'File',
				name: 'file',
				placeholder: 'Upload your file',
				type: 'file',
				validators: [],
			},
		],
	},
};

export const WithIcon: Story = {
	args: {
		fields: [
			{
				label: 'Name',
				name: 'name',
				placeholder: 'Enter your name',
				icon: 'fa-solid fa-user',
				type: 'text',
				validators: [lengthValidator(5, 20)],
			},
			{
				label: 'Upload',
				name: 'upload',
				placeholder: 'Upload your file',
				type: 'file',
				validators: [],
			},
		],
	},
};
