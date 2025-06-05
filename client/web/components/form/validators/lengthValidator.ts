import type { ValidatorFunction, FormData } from '../props';

export default function lengthValidator(
	min: number,
	max: number,
): ValidatorFunction {
	return (value: string, formData: FormData) => {
		if (value.length < min) {
			return `Value must be at least ${min} characters long`;
		}
		if (value.length > max) {
			return `Value must be at most ${max} characters long`;
		}
		return null;
	};
}
