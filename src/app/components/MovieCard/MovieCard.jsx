import React, { useState, useEffect } from "react";
import { Card, Image, Text, Group, Button } from "@mantine/core";
import styles from "./MovieCard.module.css";
import { fetchMovieGenres } from "/src/app/api/api.js";
import Link from "next/link";
import StarImage from "../StarImage/StarImage";
import RatingModal from "../RatingPopup/RatingPopup";
import { useDisclosure } from "@mantine/hooks";

function MovieCard({ movie, rating, genres }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [userRating, setUserRating] = useState(rating);
  const [availableGenres, setAvailableGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const genresData = await fetchMovieGenres();
        setAvailableGenres(genresData);
      } catch (error) {
        console.error("Error fetching movie genres:", error);
      }
    }

    fetchGenres();
  }, []);

  const getGenreNames = (movie) => {
    if (
      !availableGenres ||
      !availableGenres.length ||
      !movie.genre_ids ||
      !Array.isArray(movie.genre_ids)
    ) {
      return "";
    }

    const genreNames = movie.genre_ids.map((id) => {
      const genre = availableGenres.find((genre) => genre.id === String(id));
      return genre ? genre.name : "";
    });

    return genreNames.join(", ");
  };

  const onUpdateRating = (newRating) => {
    setUserRating(newRating);
  };

  return (
    <Card key={movie.id} shadow="sm" padding="lg" radius="md" withBorder>
      <RatingModal
        opened={opened}
        close={close}
        movie={movie}
        setUserRating={setUserRating}
        onUpdateRating={onUpdateRating}
      />

      <div className={styles.movieContent}>
        <div className={styles.imageContainer}>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            height={170}
            alt={movie.title}
          />
        </div>
        <div className={styles.textContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.titleContainer}>
              <Link
                href={`/movies/${movie.id}`}
                passHref
                style={{ textDecoration: "none" }}
              >
                <Text
                  as="a"
                  size="lg"
                  weight={700}
                  className={styles.titleText}
                >
                  {movie.title}
                </Text>
              </Link>
              <Text size="md" style={{ color: "#7B7C88" }}>
                {movie.release_date && movie.release_date.split("-")[0]}
              </Text>
              <Group className={styles.ratingContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#FAB005"
                  className="icon icon-tabler icons-tabler-filled icon-tabler-star"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />
                </svg>
                <Text size="lg" fw={700} style={{ color: "#000000" }}>
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </Text>
                <Text size="md" style={{ color: "#7B7C88" }}>
                  ({movie.vote_count})
                </Text>
              </Group>
            </div>
            <div className={styles.starAndRatingContainer}>
              <Button variant="transparent" onClick={open}>
                <StarImage alt="Star img" rated={userRating > 0} />
                {userRating > 0 && (
                  <Text size="lg" ml="5px" fw={700} c="black">
                    {userRating}
                  </Text>
                )}
              </Button>
            </div>
          </div>
          <Group>
            <Text size="md" style={{ color: "#7B7C88" }}>
              Genres{" "}
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                {getGenreNames(movie)}
              </span>
            </Text>
          </Group>
        </div>
      </div>
    </Card>
  );
}

export default MovieCard;
