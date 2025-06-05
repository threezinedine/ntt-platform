type FormData = { [key: string]: string };
type ValidatorFunction = (value: string, formData: FormData) => string | null;

export interface FormField {
	label: string;
	name: string;
	validators?: ValidatorFunction[];
}

export default interface FormProps {
	fields: FormField[];
	onSubmit?: (data: FormData) => void;
}

export type { ValidatorFunction, FormData };
