import { Color, Size, Rounded } from '@/common';

export default interface ButtonProps {
	children: React.ReactNode;
	color?: Color;
	size?: Size;
	rounded?: Rounded;
	disabled?: boolean;
	loading?: boolean;
	outline?: boolean;
	leadingIcon?: string;
	trailingIcon?: string;
	onClick?: () => void;
	testId?: string;
}
