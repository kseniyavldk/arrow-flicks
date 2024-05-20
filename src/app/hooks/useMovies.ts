import { useEffect, useState } from "react";
import { fetchMovies } from "../api/api";
import { Movie } from "../types";

export function useMovies(
  genre: string,
  year: string,
  ratingFrom?: string,
  ratingTo?: string
) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies(genre, year, ratingFrom || "", ratingTo || "")
      .then((data) => {
        console.log("Received movies:", data.results);
        setMovies(data.results);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [genre, year, ratingFrom, ratingTo]);

  return movies;
}
