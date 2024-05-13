"use client";
import React, { useState } from "react";
import { SimpleGrid } from "@mantine/core";
import MovieFilters from "../components/MovieFilters.jsx";
import MovieCard from "../components/MovieCard.jsx";
import MovieSort from "../components/MovieSort.jsx";
import { useMovies } from "@/app/api/tmdb.js";
import { Movie } from "@/app/types";

function MovieGrid() {
  const [genre, setGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [ratingFrom, setRatingFrom] = useState("");
  const [ratingTo, setRatingTo] = useState("");
  const movies: Movie[] = useMovies(genre, selectedYear);

  const handleGenreChange = (value: string) => {
    setGenre(value);
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  const handleRatingChange = (from: string, to: string) => {
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
