import { Box } from "@mui/material";

interface Props {
	id: number;
	name: string;
	image: string;
}

const Banner = ({ id, name, image }: Props) => {
	return (
		<Box
			key={id}
			position={"absolute"}
			component={"img"}
			src={image}
			alt={name}
			width={"100%"}
			style={{ aspectRatio: "16/9" }}
		/>
	);
};

export default Banner;
