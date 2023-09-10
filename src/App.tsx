import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import deepMergeMui from "./react-app/deepMergeMui";
import { GameQuery } from "./hooks/useGames";
import { useEffect, useState } from "react";
import GenreList from "./react-app/GenreList";
import Grid from "@mui/joy/Grid";
import Main from "./react-app/Main";
import NavBar from "./react-app/NavBarApp";
import PlatformFilter from "./react-app/PlatformFilter";
import Sort from "./react-app/Sort";
import { Stack } from "@mui/joy";

export default function App() {
	const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
	const [pageRequest, setPageRequest] = useState(false);
	// const [page, setPage] = useState(2);

	useEffect(() => {
		window.history.scrollRestoration = "manual";
	}, []);

	useEffect(() => {
		setPageRequest(false);
		// console.log(pageRequest, 2);
	}, [gameQuery]);

	return (
		<CssVarsProvider theme={deepMergeMui}>
			<CssBaseline />
			<br />
			<Grid
				maxWidth={1880}
				alignItems={"flex-start"}
				mx={"auto"}
				container
				gap={2}
				sx={{ flexGrow: 1 }}
			>
				<Grid xs={12}>
					<NavBar
						onSearch={(search) => {
							setGameQuery({ ...gameQuery, search: search });
							// setPage(2);
							setPageRequest(false);
						}}
						onClick={(id) => {
							setGameQuery({ ...gameQuery, genre: id + "" });
							setPageRequest(false);
							// setPage(2);
						}}
					/>
				</Grid>
				<Grid
					sx={{ width: 220, display: { sm: "none", xs: "none", md: "inline" } }}
				>
					<GenreList
						onSelect={(id) => {
							{
								setGameQuery({ ...gameQuery, genre: id + "" });
								setPageRequest(false);
								// setPage(2);
							}
						}}
					/>
				</Grid>
				<Grid xs={12} sm={12} md container mt={3} gap={1}>
					<Grid xs={12}>
						<Stack direction={"row"} spacing={2}>
							<PlatformFilter
								onSelect={(id) => {
									setGameQuery({ ...gameQuery, platform: id });
									setPageRequest(false);
									// setPage(2);
								}}
							/>
							<Sort
								onSelect={(sort) => {
									setGameQuery({ ...gameQuery, sort });
									// setPage(2);
									setPageRequest(false);
								}}
							/>
						</Stack>
					</Grid>
					<Main
						gameQuery={gameQuery}
						pageRequest={pageRequest}
						onSelected={(id) => {
							setGameQuery({ ...gameQuery, genre: id.join() });
							// setPage(2);
							setPageRequest(false);
						}}
						onPageEnd={() => {
							setGameQuery({ ...gameQuery, page: 1 });
							// setPage(page + 1);

							setPageRequest(true);
						}}
					/>
					{/* <Test /> */}
				</Grid>
			</Grid>
		</CssVarsProvider>
	);
}
