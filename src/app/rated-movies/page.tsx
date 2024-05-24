"use client";
import React, { useEffect, useState } from "react";
import { Container, rem, SimpleGrid } from "@mantine/core";
import MovieCard from "../components/MovieCard";
import NoRatedMovies from "../components/NoRatedMovies";
import EmptyResult from "../components/EmptyResult";
import Header from "../components/HeaderRatedMovies";
import { fetchMovieDetails, fetchMovieGenres } from "@/app/api/api";

interface RatedMovie {
  id: string;
  rating: number;
  title: string;
}

const RatedMovies = () => {
  const [ratedMovies, setRatedMovies] = useState<RatedMovie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<RatedMovie[]>([]);
  const [searchEmpty, setSearchEmpty] = useState(false);
  const [genres, setGenres] = useState([]);

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
          ratedMovies.push({ ...movieDetails, rating });
        }
      }
      setRatedMovies(ratedMovies);
      setFilteredMovies(ratedMovies);
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

  return (
    <Container my={rem(40)} px="xmd" size={rem(1000)}>
      <Header onSearch={handleSearch} />

      {searchEmpty ? (
        <EmptyResult />
      ) : (
        <>
          {filteredMovies.length === 0 && <NoRatedMovies />}
          <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm" w="100%">
            {filteredMovies.map((movie) => (
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
    </Container>
  );
};

export default RatedMovies;
