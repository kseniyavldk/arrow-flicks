"use client";
import React, { useState, useEffect } from "react";
import { Image, Text, Group, Card } from "@mantine/core";
import { fetchMovieDetails, fetchMovieGenres } from "@/app/api/api.js";
import { token } from "@/app/config.js";
import { Movie, Genre } from "@/app/types";
import styles from "./page.module.css";

function MovieDetails({ params }: { params: { id: string } }) {
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (params.id) {
          const movieData = await fetchMovieDetails(params.id + token);
          setMovieDetails(movieData);
        }

        const genresData = await fetchMovieGenres();
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [params.id]);

  const getGenreNames = (movie: Movie) => {
    if (!genres.length || !movie || !movie.genre_ids) return "";

    const genreNames = movie.genre_ids.map((id) => {
      const genre = genres.find((genre) => genre.id === String(id));
      return genre ? genre.name : "";
    });

    return genreNames.join(", ");
  };

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

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.cardBackground}>
      <Card shadow="sm" padding="lg" radius="md">
        <div className={styles.starContainer}>
          <Image src="/images/star.svg" />
        </div>
        <div className={styles.movieContent}>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            height={280}
            alt={movieDetails.title}
          />
          <div className={styles.textContainer}>
            <Group align="start">
              <Text
                size="lg"
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#9854F6",
                  cursor: "pointer",
                }}
              >
                {movieDetails.title}
              </Text>
            </Group>
            <Group>
              <Text size="md" style={{ color: "#7B7C88" }}>
                {movieDetails.release_date &&
                  movieDetails.release_date.split("-")[0]}
              </Text>
            </Group>
            <Group align="start">
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
                {movieDetails.vote_average.toFixed(1)}
              </Text>
              <Text size="md" style={{ color: "#7B7C88" }}>
                ({movieDetails.vote_count})
              </Text>
            </Group>
            <div className={styles.columnContainer}>
              <div className={styles.columnPair}>
                <p className={styles.textOpposite}>Duration</p>
                <Text size="md">{formatRuntime(movieDetails.runtime)}</Text>
              </div>
              <div className={styles.columnPair}>
                <p className={styles.textOpposite}>Premiere</p>
                <Text size="md">
                  {movieDetails.release_date &&
                    formatDate(movieDetails.release_date)}
                </Text>
              </div>
              <div className={styles.columnPair}>
                <p className={styles.textOpposite}>Budget</p>
                <Text size="md">${movieDetails.budget.toLocaleString()}</Text>
              </div>
              <div className={styles.columnPair}>
                <p className={styles.textOpposite}>Cross worldwide</p>
                <Text size="md">${movieDetails.revenue.toLocaleString()}</Text>
              </div>
              <div className={styles.columnPair}>
                <p className={styles.textOpposite}>Genres</p>
                <Text size="md">{getGenreNames(movieDetails)}</Text>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default MovieDetails;
