import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	name: z
		.string({ required_error: "Name field is required." })
		.min(3, { message: "Name field must be at least 3 characters." }),
	email: z.string({ required_error: "Email field is required." }).email(),
	age: z
		.number({ invalid_type_error: "Age field is required." })
		.min(18, { message: "Age must be at least 18." }),
});

type FormData = z.infer<typeof schema>;

interface Form {
	name: string;
	age: number;
	email: string;
}

const FormControl = () => {
	let sxForm = { mb: 3 };

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	return (
		<form onSubmit={handleSubmit((data) => {})}>
			<TextField
				label="Name"
				variant="outlined"
				fullWidth
				helperText={errors.name?.message}
				sx={sxForm}
				error={errors.name && true}
				{...register("name", { required: true, minLength: 3 })}
			/>

			<TextField
				label="Email"
				variant="outlined"
				fullWidth
				sx={sxForm}
				{...register("email")}
				error={errors.email && true}
				helperText={errors.email?.message}
			/>
			<TextField
				label="Age"
				variant="outlined"
				fullWidth
				type="number"
				sx={sxForm}
				{...register("age", { valueAsNumber: true })}
				error={errors.age && true}
				helperText={errors.age?.message}
			/>
			<Button variant="contained" type="submit">
				Submit
			</Button>
		</form>
	);
};

export default FormControl;
