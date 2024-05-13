"use client";
import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import MovieGrid from "./movies/MovieGrid.jsx";
import RatedMovies from "./components/RatedMovies.jsx";
import { fetchMovies } from "./api/api.js";
import Layout from "./components/Layout.jsx";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  popularity: number;
  overview: string;
  runtime: number;
  release_date: number;
  budget: number;
  revenue: number;
};
function Demo() {
  const [opened] = useDisclosure();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies()
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const [showRatedMovies, setShowRatedMovies] = useState(true);

  return (
    <Layout opened={opened}>
      {showRatedMovies ? <MovieGrid /> : <RatedMovies />}
    </Layout>
  );
}
export default Demo;
