import { Box, Link, Stack } from "@mui/material";
import { ReactNode, useEffect, useRef, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { Checkbox } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Platform from "./Platforms";
import RatingChip from "./RatingChip";
import Recommended from "./Recommended";
import ButtonJoy from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";
import { Game } from "../hooks/useGames";
import imageDecompress from "../services/image-url";
import YtVideo from "./YtVideo";
import link from "../data/game-trailer.json";
import SSPreview from "./SSPreview";
import CardCollapsible from "./CardCollapsible";

interface Props {
  game: Game;
  onSelected: (id: number[]) => void;
}

export default function GameCard({ game, onSelected }: Props) {
  const change = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [active, setActive] = useState(false);

  function doSomething(): ReactNode {
    // if (link.some((x) => Math.round(Math.random()) && x.id == game.id))
    //   return <YtVideo />;
    if (game.short_screenshots.length > 1)
      return <SSPreview ss={game.short_screenshots.filter((_, i) => i != 0)} />;
  }

  function MyComponent() {
    const [onClick, setClick] = useState(false);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const abc = (
      <CardCollapsible game={game} onSelected={(id) => onSelected(id)} />
    );
    return matches ? (
      abc
    ) : (
      <>
        {onClick && abc}
        <Link
          component={"button"}
          width={1}
          display={onClick ? "none" : "inline-block"}
          textAlign={"center"}
          color={"inherit"}
          onClick={() => setClick(!onClick)}
        >
          View more
        </Link>
      </>
    );
  }

  return (
    <Box
      // height={height}

      sx={{
        position: "relative",
        transformOrigin: "top center",
        transition: "transform .3s ease-in",
        "&:hover": { transform: "scale(1.03)", zIndex: 5 },
        "&:hover .content": { maxHeight: "100vh" },
        // ...(active && { transform: "scale(1.03)", zIndex: 5 }),
      }}
    >
      <Card
        ref={change}
        sx={{
          borderRadius: 10,
          position: "relative",
          boxShadow: "lg",
        }}
        onMouseEnter={(e) => setTimeout(() => setActive(true), 100)}
        onMouseLeave={(e) => setTimeout(() => setActive(false), 100)}
      >
        {active && doSomething()}
        <CardMedia
          component={"img"}
          sx={{
            aspectRatio: "16/9",
            width: 1,
          }}
          image={imageDecompress(game.background_image)}
          title={game.name}
          loading="lazy"
        />
        <CardContent>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Platform platform={game.parent_platforms} />
            <RatingChip critic={game.metacritic} />
          </Stack>
          <Typography
            gutterBottom
            variant="h4"
            sx={{ fontWeight: "bold", pt: 2 }}
            component="div"
          >
            {game.name}
            <Recommended rating={game.rating_top} />
          </Typography>
        </CardContent>
        <Box p={2}>
          <Stack direction={"row"} width={1}>
            <ButtonJoy
              aria-label="Like"
              startDecorator={<Add sx={{ fontSize: 35 }} />}
              variant="outlined"
              color="neutral"
              sx={{ fontSize: 18 }}
            >
              {game.added}
            </ButtonJoy>
            <Checkbox
              sx={{ color: "red", fontSize: 30 }}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
          </Stack>
        </Box>
      </Card>
      <Box sx={{ height: 0, zIndex: 1, position: "relative" }}>
        <Card
          sx={{
            position: "absolute",
            width: 1,
            maxHeight: 0,
            boxShadow: "lg",
            borderRadius: "0 0 10px 10px",
            top: -10,
          }}
          className={"content"}
        >
          {MyComponent()}
        </Card>
      </Box>
    </Box>
  );
}
