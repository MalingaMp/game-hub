import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Typography } from "@mui/joy";

interface Props {
	onSelect: (sort: string) => void;
}

export default function Sort({ onSelect }: Props) {
	const platforms = [
		{ key: "-added", value: "Date added" },
		{ key: "name", value: "Name" },
		{ key: "-released", value: "Release date" },
		{ key: "-metacritic", value: "Popularity" },
		{ key: "-rating", value: "Average rating" },
	];
	// const [onSelect, setSelect] = useState("");
	return (
		<Select
			variant="outlined"
			defaultValue=""
			indicator={<KeyboardArrowDown />}
			sx={{
				height: "fit-content",
				[`& .${selectClasses.expanded}`]: {
					transition: "0.2s",
					[`&.${selectClasses.expanded}`]: {
						transform: "rotate(-180deg)",
					},
				},
				mb: 2,
				minWidth: 180,
			}}
		>
			<Option
				label={
					<Typography lineHeight="lg">
						Order by: <Typography level="h6">Relevance</Typography>
					</Typography>
				}
				value=""
			>
				Relevance
			</Option>
			{platforms.map((platform, i) => (
				<Option
					onClick={() => onSelect(platform.key)}
					key={i}
					label={
						<Typography lineHeight="lg">
							Order by: <Typography level="h6">{platform.value}</Typography>
						</Typography>
					}
					value={platform.key}
				>
					{platform.value}
				</Option>
			))}
		</Select>
	);
}
