import { ReactNode, useState } from "react";

export interface AlertProps {
	children: ReactNode;
	button?: boolean;
	color?: "primary" | "secondary" | "danger" | "success";
	onDismiss?: () => void;
}

const Alert = ({
	children,
	button,
	color = "primary",
	onDismiss,
}: AlertProps) => {
	const [dismiss, setDismiss] = useState(false);

	if (dismiss) return null;

	return (
		<div
			// className="alert alert-primary  alert-dismissible fade show"
			className={`alert alert-${color}  ${
				button && "alert-dismissible fade show"
			}`}
			role="alert"
		>
			{children}
			{button && (
				<button
					type="button"
					className="btn-close"
					aria-label="Close"
					onClick={() => {
						onDismiss?.();
						setDismiss(true);
					}}
				></button>
			)}
		</div>
	);
};

export default Alert;
