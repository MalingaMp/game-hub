import Masonry from "@mui/lab/Masonry";
import GameCard from "./GameCard";
import SkeletonCard from "./SkeletonCard";
import Typography from "@mui/material/Typography";
import useGames from "../hooks/useGames";
import { GameQuery } from "../hooks/useGames";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

interface Props {
	gameQuery: GameQuery;
	pageRequest?: boolean;
	onSelected: (id: number[]) => void;
	onPageEnd: () => void;
}

const Main = ({ gameQuery, onSelected, onPageEnd }: Props) => {
	const [pageRequest, setPageRequest] = useState(false);
	const { error, isLoading, gameData } = useGames(gameQuery, pageRequest);
	const [page, setPage] = useState(1);

	useEffect(() => {
		setPageRequest(false);
		console.log(pageRequest, 123);
	}, [gameData]);

	if (error)
		return (
			<Typography color={"error"} gutterBottom variant="h3" component="div">
				{error}
			</Typography>
		);

	const limit = 60;

	const HandleFetch = () => {
		onPageEnd();
		setPageRequest(true);
		console.log(pageRequest);
	};

	return (
		<Box width={1}>
			<InfiniteScroll
				dataLength={gameData.length}
				next={HandleFetch}
				hasMore={gameData.length < limit}
				loader={
					<Box height={100}>
						<CircularProgress />
					</Box>
				}
				endMessage={
					<Typography style={{ height: "200px" }}>Thankyou...</Typography>
				}
			>
				<Masonry
					columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
					spacing={4}
					sx={{
						alignContent: { sm: "center", md: "flex-start" },
						mx: "auto",
					}}
				>
					{/* {gameData.map((d, i) => (
						<GameCard key={i} game={d} onSelected={(id) => onSelected(id)} />
					))} */}
					{!pageRequest && isLoading
						? Array(20)
								.fill(0)
								.map((v, i) => (
									<SkeletonCard
										isLoading={isLoading}
										count={i}
										key={i}
									></SkeletonCard>
								))
						: gameData.map((d, i) => (
								<GameCard
									key={i}
									game={d}
									onSelected={(id) => onSelected(id)}
								/>
						  ))}
				</Masonry>
			</InfiniteScroll>
		</Box>
	);
};

export default Main;
