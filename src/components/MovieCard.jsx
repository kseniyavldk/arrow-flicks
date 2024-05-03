import React, { useState } from "react";
import { Card, Image, Text, Group } from "@mantine/core";
import styles from "./MovieCard.module.css";

function MovieCard({ movie }) {
  const [genres, setGenres] = useState([]);

  const getGenreNames = (movie) => {
    if (!genres || !movie.genre_ids) return "";
    const genreNames = movie.genre_ids.map((id) => {
      const genre = genres.find((genre) => genre.id === id);
      return genre ? genre.name : "";
    });
    return genreNames.join(", ");
  };

  return (
    <Card
      key={movie.id}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={styles.movieCard}
    >
      <div className={styles.movieContent}>
        <div className={styles.imageContainer}>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            height={170}
            alt={movie.title}
          />
        </div>
        <div className={styles.textContainer}>
          <Group direction="column" gap="xs">
            <Text
              size="lg"
              weight={700}
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#9854F6",
              }}
            >
              {movie.title}
            </Text>
          </Group>
          <Group>
            <Text size="md" style={{ color: "#7B7C88" }}>
              {movie.release_date && movie.release_date.split("-")[0]}
            </Text>
          </Group>
          <Group>
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
            <Text size="lg" style={{ color: "#7B7C88" }}>
              {movie.vote_average}
            </Text>
            <Text size="md" style={{ color: "#7B7C88" }}>
              {movie.vote_count}
            </Text>
          </Group>
          <Group>
            <Text size="md" style={{ color: "#7B7C88" }}>
              Genres: {getGenreNames(movie)}
            </Text>
          </Group>
        </div>
      </div>
    </Card>
  );
}

export default MovieCard;
