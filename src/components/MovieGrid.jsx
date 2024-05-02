"use client";
import React from "react";
import { SimpleGrid, Card, Image, Rating, Text, Group } from "@mantine/core";
import { useMovies } from "../app/api/tmdb.js";
import styles from "./MovieGrid.module.css";

function MovieGrid() {
  const movies = useMovies();

  return (
    <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
      {movies.map((movie) => (
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
                <Text size="lg" weight={700}>
                  {movie.title}
                </Text>
                <Text size="sm">{movie.overview}</Text>
              </Group>
              <Group>
                <Rating defaultValue={movie.vote_average} />
              </Group>
            </div>
          </div>
        </Card>
      ))}
    </SimpleGrid>
  );
}

export default MovieGrid;
