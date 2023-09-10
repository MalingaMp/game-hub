import Alert from "./Alert";
import Button from "./Button";
import { AlertProps } from "./Alert";
import { ButtonProps } from "./Button";
import { ReactNode, useState } from "react";

interface Props {
	children: ReactNode;
	button?: string;
	buttonColor?: "primary" | "secondary" | "danger" | "success";
	alertColor?: "primary" | "secondary" | "danger" | "success";
}

const AlertButton = ({
	children,
	button = "submit",
	buttonColor,
	alertColor,
}: Props) => {
	const [showAlert, setShowAlert] = useState(false);

	return (
		<>
			{showAlert && (
				<Alert
					color={alertColor}
					button={true}
					onDismiss={() => setShowAlert(false)}
				>
					{children}
				</Alert>
			)}
			<Button color={buttonColor} onClick={() => setShowAlert(true)}>
				{button}
			</Button>
		</>
	);
};

export default AlertButton;
