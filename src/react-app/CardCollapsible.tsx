import {
	Box,
	Breadcrumbs,
	Divider,
	Link,
	ListItem,
	ListItemText,
} from "@mui/material";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Game } from "../hooks/useGames";

interface Props {
	game: Game;
	onSelected: (id: number[]) => void;
}

const CardCollapsible = ({ game, onSelected }: Props) => {
	let LocaleConfig: Intl.DateTimeFormatOptions = { dateStyle: "medium" };
	let released = new Date(game.released).toLocaleDateString(
		"en-US",
		LocaleConfig
	);

	return (
		<Box
			sx={{
				p: 2,
				transition: "all .05s",
			}}
			className="cardCollapsible"
		>
			<ListItem>
				<ListItemText
					sx={{ display: "flex", justifyContent: "space-between" }}
					primary="Release date:"
					secondary={released}
				/>
			</ListItem>
			<Divider variant="middle" />
			<ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography>Genre:</Typography>
				<Breadcrumbs>
					{game.genres
						.filter((_, i) => i < 2)
						.map((d) => (
							<Link
								component={Button}
								key={d.id}
								onClick={() => onSelected([d.id])}
								color={"inherit"}
								href="#"
							>
								{d.name}
							</Link>
						))}
				</Breadcrumbs>
			</ListItem>
			<Divider variant="middle" />
			<ListItem>
				<ListItemText
					sx={{ display: "flex", justifyContent: "space-between" }}
					primary="Chart:"
					secondary="#1 Top 2021"
				/>
			</ListItem>
			<Divider variant="middle" />

			<Button
				fullWidth
				variant="contained"
				color="secondary"
				endIcon={<ChevronRightIcon />}
				sx={{
					justifyContent: "space-between",
					textTransform: "none",
					bgcolor: "grey",
					"&:hover": {
						color: "gold",
					},
				}}
				onClick={() =>
					onSelected(game.genres.filter((_, i) => i < 2).map((x) => x.id))
				}
			>
				See more like this
			</Button>
		</Box>
	);
};

export default CardCollapsible;
