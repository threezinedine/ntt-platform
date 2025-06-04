import React from "react";
import ButtonProps from "./props";

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
	return <button {...props}>{children}</button>;
};

export default Button;
