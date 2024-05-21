import { useEffect, useState } from "react";
import { fetchMovies } from "../api/api";
import { Movie } from "../types";

export function useMovies(
  genre: string,
  year: string,
  ratingFrom?: string,
  ratingTo?: string,
  selectedSortBy?: string
) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies(genre, year, ratingFrom || "", ratingTo || "", selectedSortBy)
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [genre, year, ratingFrom, ratingTo, selectedSortBy]);

  return movies;
}
