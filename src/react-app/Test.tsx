import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Divider,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Controller } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroll-component";

interface Data {
	id: number;
	title: string;
	overview: string;
	backdrop_path: string;
}

interface Response {
	results: Data[];
}

const Test = () => {
	const [state, setState] = useState<Data[]>([]);
	const [page, setPage] = useState(1);

	const limit = 150;

	useEffect(() => {
		fetchMoreData();
	}, []);

	const fetchMoreData = () => {
		const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}`;

		const controller = new AbortController();
		axios
			.get<Response>(API_URL, { signal: controller.signal })
			.then((res) => {
				setState([...state, ...res.data.results]);
				setPage((p) => p + 1);
			})
			.catch((e) => {
				console.log(e.message);
			});

		return () => controller.abort();
	};

	return (
		<>
			<Typography width={1} component={"h2"}>
				This is Movie Database
			</Typography>
			<Divider />
			<InfiniteScroll
				dataLength={state.length}
				next={fetchMoreData}
				hasMore={state.length < 100}
				loader={<h4>Loading...</h4>}
				endMessage={<h4>Thankyou...</h4>}
			>
				<Grid container spacing={2}>
					{state.map((i, index) => (
						<Grid item key={index} sm={12} md={6} lg={4}>
							<Card sx={{ maxHeight: 350 }}>
								<CardMedia
									src={"https://image.tmdb.org/t/p/w500/" + i.backdrop_path}
									loading="lazy"
									component={"img"}
									width={1}
									title={i.title}
									sx={{ aspectRatio: "16/9" }}
								/>
								<CardContent>
									<Typography component={"h1"}>{i.title}</Typography>
									<Typography>{i.overview}</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</InfiniteScroll>
		</>
	);
};

export default Test;
