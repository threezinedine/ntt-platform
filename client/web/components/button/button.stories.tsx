import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';
import { Color, Rounded, Size } from '@/common';

const meta = {
	component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: 'Button',
		color: Color.Primary,
		disabled: false,
	},
};

export const PrimaryOutline: Story = {
	args: {
		children: 'Button',
		color: Color.Primary,
		outline: true,
	},
};

export const Secondary: Story = {
	args: {
		children: 'Button',
		color: Color.Secondary,
		disabled: false,
	},
};

export const Success: Story = {
	args: {
		children: 'Button',
		color: Color.Success,
		disabled: false,
	},
};

export const Warning: Story = {
	args: {
		children: 'Button',
		color: Color.Warning,
		disabled: false,
	},
};

export const Error: Story = {
	args: {
		children: 'Button',
		color: Color.Error,
		disabled: false,
	},
};

export const Disabled: Story = {
	args: {
		children: 'Button',
		color: Color.Secondary,
		disabled: true,
	},
};

export const Small: Story = {
	args: {
		children: 'Button',
		size: Size.Small,
	},
};

export const Medium: Story = {
	args: {
		children: 'Button',
		size: Size.Medium,
	},
};

export const Large: Story = {
	args: {
		children: 'Button',
		size: Size.Large,
	},
};

export const SuperLarge: Story = {
	args: {
		children: 'Button',
		size: Size.SuperLarge,
	},
};

export const FullWidth: Story = {
	args: {
		children: 'Button',
		size: Size.FullWidth,
	},
};

export const Sharp: Story = {
	args: {
		children: 'Button',
		rounded: Rounded.Sharp,
	},
};

export const Round: Story = {
	args: {
		children: 'Button',
		rounded: Rounded.Round,
	},
};

export const Pill: Story = {
	args: {
		children: 'Button',
		rounded: Rounded.Pill,
	},
};

export const LeadingIcon: Story = {
	args: {
		children: 'Button',
		leadingIcon: 'fa-solid fa-house',
	},
};

export const TrailingIcon: Story = {
	args: {
		children: 'Button',
		trailingIcon: 'fa-solid fa-house',
	},
};

export const Loading: Story = {
	args: {
		children: 'Button',
		loading: true,
	},
};
