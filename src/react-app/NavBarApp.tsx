import Toolbar from "@mui/material/Toolbar";
import ModeToggler from "./ModeToggler";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import logo from "../assets/logo.svg";
import Box from "@mui/joy/Box";
import { useForm } from "react-hook-form";
import SwipeableDrawer from "./SwipeableDrawer";

interface Props {
	onSearch: (search: string) => void;
	onClick: (id: number) => void;
}
export default function NavBar({ onSearch, onClick }: Props) {
	const { register, handleSubmit } = useForm();

	return (
		<Toolbar sx={{ gap: 2, px: 0 }}>
			<SwipeableDrawer onClick={(id) => onClick(id)} />
			<Box component={"img"} alt={logo} src={logo} width={60} />

			<Box width={1} minWidth={50}>
				<form onSubmit={handleSubmit((data) => onSearch(data.search))}>
					<Input
						{...register("search", { required: true })}
						sx={{
							"--Input-minHeight": "55px",
							"--Input-radius": "50px",
						}}
						fullWidth
						placeholder="Search..."
						startDecorator={<SearchIcon />}
					/>
				</form>
			</Box>

			<ModeToggler />
		</Toolbar>
	);
}
