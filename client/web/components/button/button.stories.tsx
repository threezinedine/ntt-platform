import type { Meta, StoryObj } from "@storybook/react";

import Button from ".";
import { Color } from "@/common";

const meta = {
	component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Button",
	},
};

export const Secondary: Story = {
	args: {
		children: "Button",
		color: Color.Secondary,
	},
};

export const Success: Story = {
	args: {
		children: "Button",
		color: Color.Success,
	},
};

export const Warning: Story = {
	args: {
		children: "Button",
		color: Color.Warning,
	},
};

export const Error: Story = {
	args: {
		children: "Button",
		color: Color.Error,
	},
};
