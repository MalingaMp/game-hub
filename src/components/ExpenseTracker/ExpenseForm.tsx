import {
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { categories } from "./ExpenseFilter";

const schema = z.object({
	description: z
		.string()
		.min(3, { message: "Description field must be at least 3 characters." }),
	amount: z
		.number({ invalid_type_error: "Amount field is required." })
		.positive({ message: "Amount must be positive." }),
	category: z.enum(categories, {
		errorMap: () => ({ message: "Category field is required." }),
	}),
});

type FormData = z.infer<typeof schema>;

interface Props {
	onSubmit: (expense: FormData) => void;
}
const ExpenseForm = ({ onSubmit }: Props) => {
	const [filter, setFilter] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});
	let sxForm = { mb: 3 };

	return (
		<form
			onSubmit={handleSubmit((data) => {
				onSubmit(data);
				setFilter("");
				reset();
			})}
		>
			<TextField
				label="description"
				variant="outlined"
				fullWidth
				helperText={errors.description?.message}
				sx={sxForm}
				error={errors.description && true}
				{...register("description")}
			/>
			<TextField
				label="amount"
				variant="outlined"
				fullWidth
				inputProps={{ step: "any", type: "number" }}
				helperText={errors.amount?.message}
				sx={sxForm}
				error={errors.amount && true}
				{...register("amount", { valueAsNumber: true })}
			/>
			<FormControl sx={sxForm} fullWidth error={errors.amount && true}>
				<InputLabel>Category</InputLabel>
				<Select
					label="category"
					value={filter}
					{...register("category")}
					onChange={(e) => setFilter(e.target.value)}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					{categories.map((category) => (
						<MenuItem value={category} key={category}>
							{category}
						</MenuItem>
					))}
				</Select>
				{errors.category?.message && (
					<FormHelperText>{errors.category.message}</FormHelperText>
				)}
			</FormControl>
			<Button variant="contained" type="submit">
				Submit
			</Button>
		</form>
	);
};

export default ExpenseForm;
