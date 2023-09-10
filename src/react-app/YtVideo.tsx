import { Box } from "@mui/material";
import data from "../data/game-trailer.json";
import { useRef } from "react";

function YtVideo() {
	const buttonRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			<Box
				width={1}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					position: "absolute",
					aspectRatio: "16/9",
					zIndex: 2,
				}}
			>
				<Box
					ref={buttonRef}
					className="video"
					position={"absolute"}
					component="iframe"
					allowFullScreen
					src={data[1].url}
					border={0}
					loading="lazy"
					width="100%"
					sx={{
						aspectRatio: "16/9",
					}}
				/>
			</Box>
		</>
	);
}

export default YtVideo;
