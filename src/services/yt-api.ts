import axios from "axios";

const KEY = "AIzaSyCnPH50i0v5IIgTChDZiKzK3hrB07v7Ed8";

export default axios.create({
	baseURL: "https://youtube.googleapis.com/youtube/v3",
	params: {
		part: "snippet",
		maxResults: 1,
		key: KEY,
	},
});
