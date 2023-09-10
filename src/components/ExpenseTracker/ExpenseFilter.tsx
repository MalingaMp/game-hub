import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
	SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

interface Props {
	onFilter: (category: string) => void;
	expensesLength: number;
}

export const categories = ["Cloths", "Furniture", "Utility"] as const;

const ExpenseFilter = ({ onFilter, expensesLength }: Props) => {
	const [filter, setFilter] = useState("");
	const handleChange = (e: SelectChangeEvent) => {
		const val = e.target.value;
		setFilter(val);
		onFilter(val);
	};

	if (!expensesLength) return null;

	return (
		<FormControl sx={{ my: 3, maxWidth: 300, width: "100%" }}>
			<InputLabel>Category</InputLabel>
			<Select label="category" value={filter} onChange={handleChange}>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				{categories.map((category) => (
					<MenuItem value={category} key={category}>
						{category}
					</MenuItem>
				))}
			</Select>
			<FormHelperText>Filter based on category</FormHelperText>
		</FormControl>
	);
};

export default ExpenseFilter;
