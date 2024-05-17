"use client";
import React, { useState, useEffect } from "react";
import { fetchMovies } from "./api/api.js";
import MovieFilters from "./components/MovieFilters.jsx";
import MovieCard from "./components/MovieCard.jsx";
import MovieSort from "./components/MovieSort.jsx";
import { Movie } from "@/app/types";
import { SimpleGrid, Flex, Pagination } from "@mantine/core";
import { useMovies } from "@/app/api/tmdb.js";

function Demo() {
  const [genre, setGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [ratingFrom, setRatingFrom] = useState("");
  const [ratingTo, setRatingTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
    fetchMovies(genre, selectedYear, ratingFrom, ratingTo)
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies:", error));
  }, [genre, selectedYear, ratingFrom, ratingTo]);

  const moviesPerPage = 12;
  const totalPages = Math.ceil(moviesList.length / moviesPerPage);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = moviesList.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const [showRatedMovies, setShowRatedMovies] = useState(true);

  return (
    <Flex
      direction={"column"}
      align={"flex-start"}
      py={20}
      px={100}
      gap={40}
      w={"100%"}
      h={"100%"}
      bg={"#F5F5F6"}
    >
      <Flex direction="column" w="100%">
        <MovieFilters
          onGenreChange={handleGenreChange}
          onYearChange={handleYearChange}
          onRatingChange={handleRatingChange}
        />
        <Flex justify="flex-end" mt={20}>
          <MovieSort />
        </Flex>
      </Flex>

      <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm" w="100%">
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </SimpleGrid>

      <Flex justify="flex-end" mt={20} w="100%">
        <Pagination
          total={totalPages}
          color={"#9854F6"}
          onChange={paginate}
          value={currentPage}
        />
      </Flex>
    </Flex>
  );
}
export default Demo;
