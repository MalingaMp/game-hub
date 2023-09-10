import { useEffect, useState } from "react";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import { useColorScheme } from "@mui/joy/styles";
import IconButton from "@mui/joy/IconButton";
//

const ModeToggle = () => {
	const { mode, setMode } = useColorScheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) {
		return null;
	}
	return (
		<IconButton onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
			{mode === "dark" ? <DarkMode /> : <LightMode />}
		</IconButton>
	);
};

export default ModeToggle;
