"use client";
import React, { useState } from "react";
import { SimpleGrid } from "@mantine/core";
import MovieFilters from "../components/MovieFilters";
import MovieCard from "./MovieCard";
import MovieSort from "./MovieSort";
import { useMovies } from "../app/api/tmdb.js";

function MovieGrid() {
  const [genre, setGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [ratingFrom, setRatingFrom] = useState("");
  const [ratingTo, setRatingTo] = useState("");
  const movies = useMovies(genre, selectedYear, ratingFrom, ratingTo);

  const handleGenreChange = (value) => {
    setGenre(value);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const handleRatingChange = (from, to) => {
    setRatingFrom(from);
    setRatingTo(to);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }} />
      <MovieFilters
        onGenreChange={handleGenreChange}
        onYearChange={handleYearChange}
        onRatingChange={handleRatingChange}
      />

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
