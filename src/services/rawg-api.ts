import axios from "axios";

export default axios.create({
	baseURL: "https://api.rawg.io/api",
	params: {
		key: "c339661fa4104eb48ef07cf67b97dcd4",
	},
});
