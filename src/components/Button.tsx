import { ReactNode } from "react";

export interface ButtonProps {
	children: ReactNode;
	onClick: () => void;
	color?: "primary" | "secondary" | "danger" | "success";
}

const Button = ({ children, color = "primary", onClick }: ButtonProps) => {
	return (
		<button type="button" className={`btn btn-${color}`} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
