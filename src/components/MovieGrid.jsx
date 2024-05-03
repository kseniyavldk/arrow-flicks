"use client";
import React, { useState, useEffect } from "react";
import { SimpleGrid } from "@mantine/core";
import { fetchMovies } from "../app/api/api.js";
import MovieFilters from "../components/MovieFilters";
import MovieCard from "./MovieCard";
import MovieSort from "./MovieSort";

function MovieGrid() {
  const [genre, setGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchAllMovies = async () => {
    try {
      const moviesData = await fetchMovies(genre);
      setMovies(moviesData.results);
      setAllMovies(moviesData.results);
    } catch (error) {
      console.error("Error fetching all movies:", error);
    }
  };

  const handleGenreChange = async (value) => {
    setGenre(value);
    try {
      const moviesData = await fetchMovies(value, selectedYear);
      setMovies(moviesData.results);
      setAllMovies(moviesData.results);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    }
  };

  const handleYearChange = (selectedYear) => {
    setSelectedYear(selectedYear);
    if (selectedYear === "") {
      setMovies(allMovies);
    } else {
      const filteredMovies = allMovies.filter(
        (movie) =>
          new Date(movie.release_date).getFullYear().toString() === selectedYear
      );
      setMovies(filteredMovies);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }} />
      <MovieFilters
        onGenreChange={handleGenreChange}
        onYearChange={handleYearChange}
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
