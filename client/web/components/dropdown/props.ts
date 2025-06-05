export type DropdownProps = {
	itemMap: DropdownItemData[][];
	trigger: React.ReactNode;
};

export interface DropdownItemData {
	label: string;
	newFeature?: boolean;
	special?: boolean;
	icon?: string;
	onClick?: () => void;
	closeOnClick?: boolean;
}

export interface DropdownItemProps extends DropdownItemData {}
