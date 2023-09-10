import { useState } from "react";
import { Avatar, List, ListItemButton, ListItemDecorator } from "@mui/joy";
import imageDecompress from "../services/image-url";
import genreList from "../data/genreList.json";

interface Props {
	onSelect: (id: number) => void;
}

const GenreList = ({ onSelect }: Props) => {
	// const { isLoading, data } = useGenres();
	const [selectedGenre, setGenre] = useState(0);

	return (
		<List
			sx={{
				"--ListItemDecorator-size": "60px",
				"--ListItem-paddingY": "10px",
			}}
		>
			{genreList
				.sort((a, b) => (a.name > b.name ? 1 : -1))
				.map((d) => (
					<ListItemButton
						key={d.id}
						variant={d.id == selectedGenre ? "solid" : "plain"}
						onClick={(e) => {
							setGenre(d.id);
							onSelect(d.id);
						}}
					>
						<ListItemDecorator>
							<Avatar
								size="lg"
								sx={{ borderRadius: 10 }}
								src={imageDecompress(d.image_background)}
							/>
						</ListItemDecorator>
						{d.name}
					</ListItemButton>
				))}
		</List>
	);
};

export default GenreList;
