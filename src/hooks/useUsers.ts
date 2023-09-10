import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import userService, { User } from "../services/user-service";

function useUsers() {
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState("");
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		const { request, cancel } = userService.getAll<User>();
		setLoading(true);
		request
			.then(({ data }) => {
				setLoading(false);
				setUsers(data);
			})
			.catch((e) => {
				if (e instanceof CanceledError) return;
				setError(e.message);
				setLoading(false);
			});

		return () => cancel();
	}, []);

	return { users, error, isLoading, setUsers, setError };
}

export default useUsers;
