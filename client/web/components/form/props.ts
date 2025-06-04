export interface FormField {
	label: string;
	name: string;
}

export default interface FormProps {
	fields: FormField[];
}
