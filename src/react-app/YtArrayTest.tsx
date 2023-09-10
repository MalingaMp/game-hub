import gameData from "../data/GameData.json";
import data from "../data/RawTrailersData.json";
import { YtProps } from "../hooks/useYtTrailer";

const YtArrayTest = () => {
	let ytData: YtProps[] = [];
	data.forEach((x) => {
		let params = x.config.params;
		let items = x.data.items;
		let len = " video game trailer";
		let search = params.q.substring(0, params.q.length - len.length);
		gameData.forEach((g) => {
			if (g[0].name === search) {
				ytData.push({
					id: g[0].id,
					name: g[0].name,
					slug: g[0].slug,
					title: items[0].snippet.title,
					description: items[0].snippet.description,
					videoId: items[0].id.videoId,
					url: `https://www.youtube.com/embed/${items[0].id.videoId}?controls=0&amp;start=7`,
					thumbnails: items[0].snippet.thumbnails,
				});
			}
		});
	});

	return <div>YtArrayTest</div>;
};

export default YtArrayTest;
