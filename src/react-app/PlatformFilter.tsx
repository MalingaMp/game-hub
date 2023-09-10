import * as React from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Typography } from "@mui/joy";
import usePlatform, { Platform } from "../hooks/usePlatform";
import data from "../data/parent-platform.json";

interface Props {
	onSelect: (id: number) => void;
}
export default function PlatformFilter({ onSelect }: Props) {
	// const { data } = usePlatform();

	return (
		<Select
			variant="outlined"
			defaultValue=""
			indicator={<KeyboardArrowDown />}
			sx={{
				mb: 2,
				minWidth: 150,
				[`& .${selectClasses.expanded}`]: {
					transition: "0.2s",
					[`&.${selectClasses.expanded}`]: {
						transform: "rotate(-180deg)",
					},
				},
			}}
		>
			<Option
				label={<Typography>Platforms</Typography>}
				sx={{ fontStyle: "italic" }}
				value=""
			>
				Platforms
			</Option>
			{data.map((d, i) => (
				<Option
					onClick={() => {
						onSelect(d.id);
					}}
					key={d.id}
					label={<Typography>{d.name}</Typography>}
					value={d.id}
				>
					{d.name}
				</Option>
			))}
		</Select>
	);
}
