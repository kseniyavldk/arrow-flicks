"use client";
import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Text } from "@mantine/core";
import NavBar from "../components/NavBar.jsx";
import MovieGrid from "../components/MovieGrid.jsx";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  popularity: number;
  overview: string;
};

function Demo() {
  const [opened] = useDisclosure();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer ca63987f2e3432d94a2064d1e1ff4cf8",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    )
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <NavBar opened={undefined} />

      <AppShell.Main style={{ marginLeft: "60px", marginRight: "60px" }}>
        <div>
          <Text
            style={{
              fontSize: "32px",
              fontWeight: 700,
              lineHeight: "44.8px",
              textAlign: "left",
            }}
          >
            Movies
          </Text>
        </div>

        <MovieGrid />
      </AppShell.Main>
    </AppShell>
  );
}
export default Demo;
