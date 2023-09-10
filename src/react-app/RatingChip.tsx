import Chip from "@mui/joy/Chip";

interface Props {
	critic: number;
}

const RatingChip = ({ critic }: Props) => {
	if (!critic) return null;
	return (
		<Chip
			sx={{ letterSpacing: 3, borderRadius: 5 }}
			color="success"
			size="md"
			variant="soft"
		>
			{critic}
		</Chip>
	);
};

export default RatingChip;
