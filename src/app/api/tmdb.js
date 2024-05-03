import { useEffect, useState } from "react";
import { fetchMovies } from "./api";

export function useMovies(genre = "", year = "") {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesByGenreAndYear = async () => {
      try {
        const moviesData = await fetchMovies(genre, year);
        setMovies(moviesData.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMoviesByGenreAndYear();

    return () => {};
  }, [genre, year]);

  return movies;
}
