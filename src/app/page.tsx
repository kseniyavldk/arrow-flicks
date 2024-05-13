"use client";
import React, { useState, useEffect } from "react";
import { fetchMovies } from "./api/api.js";
import MovieFilters from "./components/MovieFilters.jsx";
import MovieCard from "./components/MovieCard.jsx";
import MovieSort from "./components/MovieSort.jsx";
import { Movie } from "@/app/types";
import { SimpleGrid, Flex } from "@mantine/core";
import { useMovies } from "@/app/api/tmdb.js";

function Demo() {
  const [genre, setGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [ratingFrom, setRatingFrom] = useState("");
  const [ratingTo, setRatingTo] = useState("");
  const moviesList: Movie[] = useMovies(genre, selectedYear);
  const [movies, setMovies] = useState<Movie[]>([]);

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

  useEffect(() => {
    fetchMovies()
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const [showRatedMovies, setShowRatedMovies] = useState(true);

  return (
    <Flex
      direction={"column"}
      align={"flex-start"}
      py={40}
      px={50}
      gap={40}
      w={"100%"}
      h={"100%"}
      bg={"#F5F5F6"}
    >
      <MovieFilters
        onGenreChange={handleGenreChange}
        onYearChange={handleYearChange}
        onRatingChange={handleRatingChange}
      />

      <div style={{ marginBottom: "10px" }} />
      <MovieSort />

      <div style={{ marginBottom: "40px" }} />

      <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
        {moviesList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
export default Demo;
