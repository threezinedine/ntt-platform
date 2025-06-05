import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from '.';
import Button from '@/components/button';

const meta = {
	component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		trigger: <Button>Test</Button>,
		itemMap: [
			[
				{ label: 'My Profile', newFeature: true },
				{ label: 'Settings', newFeature: true },
			],
			[{ label: 'Billing & Subscriptions' }, { label: 'Help Center' }],
			[{ label: 'Login', special: true }],
		],
	},
};
