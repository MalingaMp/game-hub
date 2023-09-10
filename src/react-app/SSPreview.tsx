import { MouseEvent, useRef, useState } from "react";
import imageDecompress from "../services/image-url";
import { Box, Stack } from "@mui/material";

interface Props {
	ss: { image: string }[];
}

function SSPreview({ ss }: Props) {
	const [getter, setGetter] = useState(0.0);

	const handleEvent = (e: MouseEvent) => {
		e.preventDefault();
		let b = e.currentTarget.getBoundingClientRect();

		if (b.x && b.width) {
			let val = Math.abs((e.clientX - b.x) / b.width) % 1;

			setGetter(val);
		}
	};

	let imageIndex = Math.floor(getter * ss.length);

	return (
		<Box position={"absolute"} width={1}>
			<Box
				onMouseMove={handleEvent}
				onMouseLeave={() => setGetter(0)}
				component="img"
				src={imageDecompress(ss[imageIndex].image)}
				alt={"game name"}
				loading="lazy"
				sx={{
					objectFit: "cover",
					width: "100%",
					aspectRatio: "16/9",
					transition: "all .4s",
					position: "relative",
				}}
			/>
			<Stack
				width={"100%"}
				spacing={1}
				p={2}
				direction={"row"}
				sx={{
					position: "absolute",
					bottom: 0,
					zIndex: 3,
				}}
			>
				{ss.map((_, i) => (
					<Box
						width={"100%"}
						key={i}
						sx={{
							height: 5,
							background: imageIndex == i ? "white" : "grey",
							borderRadius: 10,
						}}
					/>
				))}
			</Stack>
		</Box>
	);
}

export default SSPreview;
