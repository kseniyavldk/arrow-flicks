"use client";
import React, { useState } from "react";
import { SimpleGrid } from "@mantine/core";
import { useMovies } from "../app/api/tmdb.js";
import MovieFilters from "../components/MovieFilters";
import MovieCard from "./MovieCard";
import MovieSort from "./MovieSort";

function MovieGrid() {
  const [genre, setGenre] = useState("");
  const movies = useMovies(genre);

  const handleGenreChange = (value) => {
    setGenre(value);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }} />
      <MovieFilters onGenreChange={handleGenreChange} />

      <div style={{ marginBottom: "10px" }} />
      <MovieSort />

      <div style={{ marginBottom: "40px" }} />

      <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </SimpleGrid>
    </div>
  );
}

export default MovieGrid;
