"use client";
import { notFound } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Paper,
  Stack,
  Image,
  Text,
  Group,
  Box,
  Loader,
  Button,
} from "@mantine/core";
import { fetchMovieDetails, fetchMovieGenres } from "@/app/api/api.js";
import { token } from "@/app/config.js";
import { Movie, Genre, Video } from "@/app/types";
import StarImage from "../components/StarImage";
import { useDisclosure } from "@mantine/hooks";
import RatingModal from "../components/RatingPopup";

import styles from "./page.module.css";
import { CompanyMovieProduction } from "@/app/types";

type MovieDetailsProps = {
  params: { id: string };
};

function MovieCard({ params }: MovieDetailsProps) {
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [productionData, setProductionData] = useState<
    CompanyMovieProduction[]
  >([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [userRating, setUserRating] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        if (params.id) {
          const movieData = await fetchMovieDetails(params.id + token);
          setMovieDetails(movieData);
          setProductionData(movieData.production_companies);
          if (movieData.videos.results.length > 0) {
            const trailerData = movieData.videos.results.find(
              (video: Video) => video.type === "Trailer"
            );
            if (trailerData) {
              setTrailer(trailerData);
            }
          }
        }
        const genresData = await fetchMovieGenres();
        setGenres(genresData);

        const storedRating = localStorage.getItem(`movie_${params.id}_rating`);
        if (storedRating) {
          setUserRating(parseInt(storedRating));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [params.id]);

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const onUpdateRating = (newRating: number) => {
    setUserRating(newRating);
  };

  if (!movieDetails) {
    return (
      <div className={styles.loaderContainer}>
        <Loader color="grape" />
      </div>
    );
  }

  if (!movieDetails) {
    notFound();
  }

  return (
    <Paper radius="lg" p="lg" pos="relative">
      <Box
        style={{ position: "absolute", top: "8px", right: "8px", zIndex: 1 }}
      >
        <Button
          variant="transparent"
          className={styles.starContainer}
          onClick={open}
        >
          <StarImage alt="Star img" rated={userRating > 0} />
          <Text size="lg" ml="5px" fw={700} c="black">
            {userRating}
          </Text>
        </Button>
      </Box>

      <Group align="flex-start" wrap="nowrap" gap="xlg">
        <Box>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            height={280}
            alt={movieDetails.title}
          />
        </Box>
        <Box>
          <Text size="lg" c="#9854F6" fw={600}>
            {movieDetails.title}
          </Text>

          <Text size="md" c="#7B7C88">
            {movieDetails.release_date &&
              movieDetails.release_date.split("-")[0]}
          </Text>

          <Group mb="xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#FAB005"
              className="icon icon-tabler icons-tabler-filled icon-tabler-star"
              style={{ marginRight: "8px" }}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />
            </svg>

            <Text size="lg" fw={700} style={{ color: "#000000" }}>
              {movieDetails.vote_average.toFixed(1)}
            </Text>

            <Text size="md" style={{ color: "#7B7C88" }}>
              ({movieDetails.vote_count})
            </Text>
          </Group>

          <Stack gap="xs">
            <Group align="flex-start" wrap="nowrap" gap="sm">
              <Text size="md" c="#7B7C88" ta="left" w={130}>
                Duration
              </Text>
              <Text size="md">{formatRuntime(movieDetails.runtime)}</Text>
            </Group>

            <Group align="flex-start" wrap="nowrap" gap="sm">
              <Text size="md" c="#7B7C88" ta="left" w={130}>
                Premiere
              </Text>
              <Text size="md">
                {movieDetails.release_date &&
                  formatDate(movieDetails.release_date)}
              </Text>
            </Group>

            <Group align="flex-start" wrap="nowrap" gap="sm">
              <Text size="md" c="#7B7C88" ta="left" w={130}>
                Budget
              </Text>
              <Text size="md">${movieDetails.budget.toLocaleString()}</Text>
            </Group>

            <Group align="flex-start" wrap="nowrap" gap="sm">
              <Text size="md" c="#7B7C88" ta="left" w={130}>
                Cross worldwide
              </Text>
              <Text size="md">${movieDetails.revenue.toLocaleString()}</Text>
            </Group>

            <Group align="flex-start" wrap="nowrap" gap="sm">
              <Text size="md" c="#7B7C88" ta="left" w={130}>
                Genres
              </Text>
              <Text size="md">
                {movieDetails.genres
                  .map((genre: Genre) => genre.name)
                  .join(", ")}
              </Text>
            </Group>
          </Stack>
        </Box>
      </Group>

      <RatingModal
        opened={opened}
        close={close}
        movie={movieDetails}
        setUserRating={setUserRating}
        onUpdateRating={onUpdateRating}
      />
    </Paper>
  );
}

export default MovieCard;
