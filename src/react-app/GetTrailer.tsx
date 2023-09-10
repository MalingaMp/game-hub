import React from "react";
import useTrailer from "../hooks/useTrailer";
import Link from "@mui/joy/Link";
import Launch from "@mui/icons-material/Launch";
import { Typography } from "@mui/joy";

interface Props {
	gameId: number;
}

const GetTrailer = ({ gameId }: Props) => {
	const { gameData } = useTrailer(gameId);
	if (!gameData[0])
		return (
			<Typography variant="outlined" color="success">
				imagination
			</Typography>
		);
	let link = gameData[0].data[480];

	return (
		<Link
			href={link}
			endDecorator={<Launch />}
			target="_blank"
			rel="noreferrer"
		>
			Click here
		</Link>
	);
};

export default GetTrailer;
