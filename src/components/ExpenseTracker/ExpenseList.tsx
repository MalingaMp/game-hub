import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button,
	TableFooter,
} from "@mui/material";

export interface ItemCart {
	id: number;
	description: string;
	amount: number;
	category: string;
}
interface Props {
	expenses: ItemCart[];
	onDelete: (id: number) => void;
	onClear: () => void;
}

const ExpenseList = ({ expenses, onDelete, onClear }: Props) => {
	if (expenses.length == 0) return null;
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 250 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Description</TableCell>
						<TableCell align="right">Amount</TableCell>
						<TableCell align="right">Category</TableCell>
						<TableCell align="center">
							<Button
								variant="contained"
								color="error"
								onClick={() => onClear()}
							>
								Clear
							</Button>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{expenses.map((expense) => (
						<TableRow key={expense.id}>
							<TableCell component="th" scope="row">
								{expense.description}
							</TableCell>
							<TableCell align="right">{expense.amount}</TableCell>
							<TableCell align="right">{expense.category}</TableCell>
							<TableCell align="center">
								<Button
									variant="outlined"
									color="error"
									onClick={() => onDelete(expense.id)}
								>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow
						key={"sub total"}
						sx={{ "& td": { border: 0, fontWeight: "900", fontSize: "1rem" } }}
					>
						<TableCell>Total</TableCell>
						<TableCell align="right">
							${expenses.reduce((acc, cur) => cur.amount + acc, 0)}
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
};

export default ExpenseList;
