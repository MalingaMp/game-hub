import { Avatar } from "@mui/material";
import React from "react";
import exceptional from "../assets/exceptional.webp";
import meh from "../assets/meh.webp";
import thumbsUp from "../assets/thumbs-up.webp";
import skip from "../assets/skip.webp";

interface Props {
	rating: number;
}

const Recommended = ({ rating }: Props) => {
	const ratings = [
		{ rate: 1, logo: skip },
		{ rate: 2, logo: skip },
		{ rate: 3, logo: meh },
		{ rate: 4, logo: thumbsUp },
		{ rate: 5, logo: exceptional },
	];
	if (!rating) return null;

	const [{ logo }] = ratings.filter((x) => x.rate == rating);

	return (
		<Avatar
			alt={logo}
			src={logo}
			sx={{ display: "inline-flex", width: 28, ml: 1, height: 28 }}
		/>
	);
};

export default Recommended;
