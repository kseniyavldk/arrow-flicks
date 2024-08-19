"use client";
import React, { useEffect, useState } from "react";
import { Container, rem, SimpleGrid, Flex, Pagination } from "@mantine/core";
import MovieCard from "../components/MovieCard/MovieCard";
import NoRatedMovies from "./NoRatedMovies";
import EmptyResult from "./EmptyResult";
import Header from "./HeaderRatedMovies";
import { fetchMovieDetails, fetchMovieGenres } from "@/app/api/api";

interface RatedMovie {
  id: string;
  name: string;
  rating: number;
  title: string;
}

const RatedMovies = () => {
  const [ratedMovies, setRatedMovies] = useState<RatedMovie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<RatedMovie[]>([]);
  const [searchEmpty, setSearchEmpty] = useState(false);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const moviesPerPage = 8;
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const getRatedMovies = async () => {
      const ratedMovies = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("movie_")) {
          const movieId = key.split("_")[1];
          const movieRating = localStorage.getItem(key);
          const rating = movieRating ? parseInt(movieRating) : 0;

          const movieDetails = await fetchMovieDetails(movieId);

          const genre_ids = movieDetails.genres
            ? movieDetails.genres.map((genre: RatedMovie) => genre.id)
            : [];

          ratedMovies.push({ ...movieDetails, rating, genre_ids });
        }
      }
      setRatedMovies(ratedMovies);
      setFilteredMovies(ratedMovies);
      setLoading(false);
    };

    const fetchGenresData = async () => {
      try {
        const genresData = await fetchMovieGenres();
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching movie genres:", error);
      }
    };

    getRatedMovies();
    fetchGenresData();
  }, []);

  const handleSearch = (query: string) => {
    if (query === "") {
      setFilteredMovies(ratedMovies);
      setSearchEmpty(false);
    } else {
      const filtered = ratedMovies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
      setSearchEmpty(filtered.length === 0);
    }
  };

  useEffect(() => {
    const totalMovies = filteredMovies.length;
    const calculatedTotalPages = Math.ceil(totalMovies / moviesPerPage);
    setTotalPages(calculatedTotalPages);
  }, [filteredMovies, moviesPerPage]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return null;
  }

  return (
    <Container my={rem(40)} px="xmd" size={rem(1000)}>
      <Header onSearch={handleSearch} />

      {searchEmpty ? (
        <EmptyResult />
      ) : currentMovies.length === 0 ? (
        <NoRatedMovies />
      ) : (
        <>
          {currentMovies.length === 0 && <NoRatedMovies />}
          <SimpleGrid
            cols={{ base: 1, sm: 2 }}
            spacing="sm"
            verticalSpacing="sm"
            w="100%"
            miw="sm"
          >
            {currentMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                rating={localStorage.getItem(`movie_${movie.id}_rating`)}
                genres={genres}
              />
            ))}
          </SimpleGrid>
        </>
      )}

      <Flex justify="center" mt={20} w="100%">
        <Pagination
          total={totalPages}
          color={"#9854F6"}
          onChange={paginate}
          value={currentPage}
        />
      </Flex>
    </Container>
  );
};

export default RatedMovies;
