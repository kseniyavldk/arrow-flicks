import React, { useState } from "react";
import { Card, Image, Text, Group, Button } from "@mantine/core";
import styles from "./MovieCard.module.css";
import Link from "next/link";
import StarImage from "../StarImage/StarImage";
import RatingModal from "../RatingPopup/RatingPopup";
import { useDisclosure } from "@mantine/hooks";
import { Movie, Genre } from "@/app/types";

interface MovieCardProps {
  movie: Movie;
  rating: number | null;
  genres: Genre[];
  onDelete?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  rating,
  genres,
  onDelete,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [userRating, setUserRating] = useState<number | null>(rating);

  const onUpdateRating = (newRating: number) => {
    setUserRating(newRating);
    localStorage.setItem(`movie_${movie.id}_rating`, newRating.toString());
  };

  const getGenreNames = (movie: Movie) => {
    if (
      !genres ||
      !genres.length ||
      !movie.genre_ids ||
      !Array.isArray(movie.genre_ids)
    ) {
      return "Unknown";
    }

    const genreNames = movie.genre_ids.map((id) => {
      const genre = genres.find((genre) => genre.id === id.toString());
      return genre ? genre.name : "Unknown";
    });

    return genreNames.join(", ");
  };

  return (
    <Card key={movie.id} shadow="sm" padding="lg" radius="md" withBorder>
      <RatingModal
        opened={opened}
        close={close}
        movie={movie}
        setUserRating={setUserRating}
        onUpdateRating={onUpdateRating}
        onDelete={onDelete || (() => {})}
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
                <Text size="lg" className={styles.titleText}>
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
                <StarImage
                  alt="Star img"
                  rated={userRating ? userRating > 0 : false}
                />
                {userRating && userRating > 0 && (
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
                className={styles.genreText}
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
};

export default MovieCard;
