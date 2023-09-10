import { Card, Stack, Skeleton } from "@mui/material";

interface Props {
	isLoading: boolean;
	count: number;
}

const SkeletonCard = ({ isLoading, count }: Props) => {
	if (isLoading) {
		return (
			<Card sx={{ borderRadius: 4, boxShadow: "lg" }}>
				<Skeleton
					style={{ paddingTop: "57%" }}
					variant="rectangular"
					width="100%"
				/>
				<Stack p={2}>
					<Stack
						direction={"row"}
						justifyContent={"space-between"}
						alignItems={"center"}
					>
						<Skeleton animation="wave" width={"40%"} height={30} />
						<Skeleton animation="wave" width={40} height={40} />
					</Stack>
					<Skeleton animation="wave" height={50} />
					{count % 2 == 0 && <Skeleton animation="wave" height={50} />}
					<Skeleton animation="wave" width={"40%"} height={30} />
				</Stack>
			</Card>
		);
	} else return null;
};

export default SkeletonCard;
