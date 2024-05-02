"use client";
import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Text, UnstyledButton, Select } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import NavBar from "../components/NavBar.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
//import GenreSelect from "../components/GenreSelect.jsx";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  popularity: number;
  overview: string;
};

function Demo() {
  const [opened, { toggle }] = useDisclosure();
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
        <div style={{ marginBottom: "20px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Select
            rightSection={
              <IconChevronDown style={{ width: "1rem", height: "1rem" }} />
            }
            label="Genres"
            placeholder="Select genre"
            data={[]}
          />
          {/*  <GenreSelect /> */}
          <Select
            rightSection={
              <IconChevronDown style={{ width: "1rem", height: "1rem" }} />
            }
            label="Release year"
            placeholder="Select release year"
            data={[]}
          />
          <Select
            style={{ width: "137px" }}
            label="Ratings"
            placeholder="From"
            data={[]}
          />
          <Select
            style={{ width: "137px", height: "0.6rem" }}
            placeholder="To"
            data={[]}
          />
          <div
            style={{
              marginTop: "20px",
              fontWeight: 500,
            }}
          >
            <UnstyledButton style={{ color: "#7B7C88" }}>
              Reset filters
            </UnstyledButton>
          </div>
        </div>
        <div style={{ marginBottom: "10px" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Select
            style={{ width: "200px" }}
            rightSection={
              <IconChevronDown style={{ width: "1rem", height: "1rem" }} />
            }
            label="Sort by"
            placeholder="Most popular"
            data={["Most popular"]}
          />
        </div>

        <div style={{ marginBottom: "40px" }} />
        <MovieGrid />
      </AppShell.Main>
    </AppShell>
  );
}
export default Demo;
