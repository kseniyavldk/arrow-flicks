"use client";
import React from "react";
import { Text, Paper, Divider, Title, Stack } from "@mantine/core";
import { Video, CompanyMovieProduction } from "../types";
import MovieProduction from "./movie-production/page";

type MovieDetailsCardProps = {
  movieId: number;
  trailerUrl: Video | null;
  description: string;
  production: CompanyMovieProduction[];
};

function MovieDetailsCard({
  description,
  trailerUrl,
  production,
}: MovieDetailsCardProps) {
  return (
    <Paper radius="lg" p="lg" withBorder>
      <Title size="md" fw="600" mb="md">
        Trailer
      </Title>

      {trailerUrl ? (
        <iframe
          id={trailerUrl.id}
          title="trailer"
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${trailerUrl.key}`}
          allowFullScreen
          style={{ borderRadius: "8px", overflow: "hidden" }}
        ></iframe>
      ) : (
        <p>No trailer available</p>
      )}

      <Divider my="md" bg="#D5D6DC" />

      <Title size="md" fw="600" mb="md">
        Description
      </Title>

      <Text fz="sm" lh="xs">
        {description}
      </Text>

      {(trailerUrl || description) && production && production.length > 0 ? (
        <Divider bg="#D5D6DC" my="xl" />
      ) : null}

      {production && production.length > 0 ? (
        <>
          <Title size="md" fw="600" mb="md">
            Production
          </Title>
          <Stack gap="lg">
            {production.map(({ id, name, logo_path }) => (
              <MovieProduction key={id} title={name} src={logo_path} />
            ))}
          </Stack>
        </>
      ) : null}
    </Paper>
  );
}

export default MovieDetailsCard;
