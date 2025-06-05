type FormData = { [key: string]: string };
type ValidatorFunction = (value: string, formData: FormData) => string | null;

export interface FormField {
	label: string;
	type:
		| 'text'
		| 'email'
		| 'password'
		| 'number'
		| 'file'
		| 'select'
		| 'checkbox'
		| 'date';
	name: string;
	options?: string[]; // only for select field
	placeholder?: string;
	icon?: string;
	validators?: ValidatorFunction[];
}

export default interface FormProps {
	fields: FormField[];
	onSubmit?: (data: FormData, setLoading: (state: boolean) => void) => void;
	className?: string;
}

export type { ValidatorFunction, FormData };
