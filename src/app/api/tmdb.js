import { useEffect, useState } from "react";
import { fetchMovies } from "./api.js";

export function useMovies(
  genre = "",
  year = "",
  ratingFrom = "",
  ratingTo = ""
) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesByGenreYearAndRating = async () => {
      try {
        const moviesData = await fetchMovies(genre, year, ratingFrom, ratingTo);
        setMovies(moviesData.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMoviesByGenreYearAndRating();

    return () => {};
  }, [genre, year, ratingFrom, ratingTo]);

  return movies;
}
