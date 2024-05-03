import React, { useEffect, useState } from "react";
import { Select, UnstyledButton } from "@mantine/core";
import { fetchMovieGenres, fetchMoviesYears } from "../app/api/api.js";
import { IconChevronDown } from "@tabler/icons-react";

function MovieFilters({ onGenreChange, onYearChange }) {
  const [genres, setGenres] = useState([]);
  const [releaseYears, setReleaseYears] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const apiKey = "ca63987f2e3432d94a2064d1e1ff4cf8";

    fetchMovieGenres(apiKey)
      .then((data) => setGenres(data))
      .catch((error) => console.error("Error fetching movie genres:", error));

    fetchMoviesYears()
      .then((years) => setReleaseYears(years))
      .catch((error) =>
        console.error("Error fetching movie release years:", error)
      );
  }, []);

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
    onGenreChange(value);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
    onYearChange(value);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <Select
        rightSection={
          <IconChevronDown style={{ width: "1rem", height: "1rem" }} />
        }
        label="Genres"
        placeholder="Select genre"
        data={genres.map((genre) => ({ value: genre.id, label: genre.name }))}
        value={selectedGenre}
        onChange={handleGenreChange}
      />
      <Select
        rightSection={
          <IconChevronDown style={{ width: "1rem", height: "1rem" }} />
        }
        label="Release year"
        placeholder="Select release year"
        data={releaseYears}
        value={selectedYear}
        onChange={handleYearChange}
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
  );
}

export default MovieFilters;
