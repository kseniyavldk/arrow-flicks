"use client";
import React, { useEffect, useState } from "react";
import { SimpleGrid, Flex, Pagination } from "@mantine/core";
import { useMovies } from "@/app/api/tmdb";
import MovieFilters from "./components/MovieFilters/MovieFilters";
import MovieCard from "./components/MovieCard/MovieCard";
import MovieSort from "./components/MovieSort/MovieSort";
import { Movie, SearchParams, Genre } from "../app/types";
import { fetchMovieGenres } from "@/app/api/api.js";
import styles from "./page.module.css";

interface DemoProps {
  searchParams: SearchParams;
}

function Demo({ searchParams }: DemoProps) {
  const [genre, setGenre] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [ratingFrom, setRatingFrom] = useState<string>("");
  const [ratingTo, setRatingTo] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedSortBy, setSelectedSortBy] =
    useState<string>("popularity.desc");

  const moviesPerPage = 12;
  const [currentMovies, setCurrentMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [genres, setGenres] = useState<Genre[]>([]);

  const movies: Movie[] = useMovies(genre, selectedYear, ratingFrom, ratingTo);

  useEffect(() => {
    const sortedMovies = [...movies].sort((a, b) => {
      if (selectedSortBy === "vote_average.desc") {
        return b.vote_average - a.vote_average;
      } else if (selectedSortBy === "vote_average.asc") {
        return a.vote_average - b.vote_average;
      }
      return b.popularity - a.popularity;
    });
    setCurrentMovies(sortedMovies);
  }, [movies, selectedSortBy]);

  useEffect(() => {
    const totalMovies = movies.length;
    const calculatedTotalPages = Math.ceil(totalMovies / moviesPerPage);
    setTotalPages(calculatedTotalPages);
  }, [movies, moviesPerPage]);

  useEffect(() => {
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const slicedMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    setCurrentMovies(slicedMovies);
  }, [movies, currentPage, moviesPerPage]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await fetchMovieGenres();
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching movie genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreChange = (value: string) => {
    setGenre(value);
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  const handleRatingChange = (minRating: string, maxRating: string) => {
    setRatingFrom(minRating);
    setRatingTo(maxRating);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSelectedSortBy(value);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Flex
      direction={"column"}
      align={"flex-start"}
      py={20}
      px={{ base: 20, sm: 50, md: 100 }}
      gap={40}
      w={"100%"}
      h={"100%"}
      bg={"#F5F5F6"}
      className={styles.demoContainer}
    >
      <Flex direction="column" w="100%">
        <MovieFilters
          onGenreChange={handleGenreChange}
          onYearChange={handleYearChange}
          onRatingChange={handleRatingChange}
        />
        <Flex justify="flex-end" mt={20}>
          <MovieSort
            defaultSortOption={selectedSortBy}
            onSortChange={handleSortChange}
          />
        </Flex>
      </Flex>

      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        spacing="sm"
        verticalSpacing="sm"
        w="100%"
      >
        {currentMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            rating={
              parseFloat(
                localStorage.getItem(`movie_${movie.id}_rating`) || "0"
              ) || null
            }
            genres={genres}
          />
        ))}
      </SimpleGrid>

      <Flex justify="center" mt={20} w="100%">
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
