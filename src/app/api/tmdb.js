import { useEffect, useState } from "react";
import { fetchMovies } from "./api";

export function useMovies(genre = "", year = "") {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies(genre, year)
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies:", error));
  }, [genre, year]);

  return movies;
}
