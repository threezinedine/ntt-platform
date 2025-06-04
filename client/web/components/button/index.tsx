import React from "react";
import ButtonProps from "./props";
import { Color } from "@/common";
import clsx from "clsx";

const Button: React.FC<ButtonProps> = ({
	children,
	color = Color.Primary,
	...props
}) => {
	const colorClassCommon = clsx(
		"p-4",
		"rounded-md",
		"text-white",
		"font-bold",
		"cursor-pointer",
		"hover:opacity-80"
	);

	const colorClass = clsx({
		"bg-slate-100": color === Color.Primary,
		"bg-slate-200": color === Color.Secondary,
		"bg-slate-300": color === Color.Success,
		"bg-slate-400": color === Color.Warning,
		"bg-slate-500": color === Color.Error,
	});

	return (
		<button className={clsx(colorClassCommon, colorClass)} {...props}>
			{children}
		</button>
	);
};

export default Button;
