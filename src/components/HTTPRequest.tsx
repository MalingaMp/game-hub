import {
	Button,
	CircularProgress,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import userService, { User } from "../services/user-service";
import useUsers from "../hooks/useUsers";

const HTTPRequest = () => {
	const { users, error, isLoading, setUsers, setError } = useUsers();

	function deleteUser(user: User) {
		const originalUsers = [...users];
		setUsers(users.filter((u) => u.id !== user.id));

		userService.delete<User>(user).catch((e) => {
			setUsers(originalUsers);
			setError(e.message);
		});
	}

	function updateUser(user: User) {
		const originalUsers = [...users];

		const userUpdate = { ...user, name: user.name + " !!" };

		setUsers(users.map((u) => (user.id == u.id ? userUpdate : u)));

		userService.update(user).catch((e) => {
			setError(e.message);
			setUsers(originalUsers);
		});
	}

	function addUser() {
		const originalUsers = [...users];
		const newUser = { id: 0, name: "Mahesh" };

		setUsers([newUser, ...users]);

		userService
			.add(newUser)
			.then(({ data }) => setUsers([data, ...users]))
			.catch((e) => {
				setError(e.message);
				setUsers(originalUsers);
			});
	}

	if (isLoading)
		return (
			<CircularProgress
				sx={{
					"--CircularProgress-size": "83px",
				}}
			/>
		);

	return (
		<>
			<Typography color={error ? "error" : "none"} variant="h5" gutterBottom>
				{error ? error : "Users Profile"}
			</Typography>
			<Button onClick={() => addUser()} variant="contained">
				Create new User
			</Button>
			<List>
				{users.map((user) => (
					<ListItemButton key={user.id}>
						<ListItemText primary={user.id + " " + user.name} />
						<Button
							sx={{ mr: 3 }}
							onClick={() => updateUser(user)}
							variant="outlined"
						>
							Update
						</Button>
						<Button
							color="error"
							onClick={() => deleteUser(user)}
							variant="outlined"
						>
							Delete
						</Button>
					</ListItemButton>
				))}
			</List>
		</>
	);
};

export default HTTPRequest;
