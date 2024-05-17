import React, { useEffect, useState } from "react";
import { Select, UnstyledButton, Text } from "@mantine/core";
import {
  fetchMovieGenres,
  fetchMoviesYears,
  fetchMovieRatings,
} from "/src/app/api/api.js";
import { IconChevronDown } from "@tabler/icons-react";
import { apiKey } from "/src/app/config.js";

function MovieFilters({ onGenreChange, onYearChange, onRatingChange }) {
  const [genres, setGenres] = useState([]);
  const [releaseYears, setReleaseYears] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [ratingFrom, setRatingFrom] = useState("");
  const [ratingTo, setRatingTo] = useState("");

  useEffect(() => {
    fetchMovieGenres(apiKey)
      .then((data) => setGenres(data))
      .catch((error) => console.error("Error fetching movie genres:", error));

    fetchMoviesYears()
      .then((years) => setReleaseYears(years))
      .catch((error) =>
        console.error("Error fetching movie release years:", error)
      );

    fetchMovieRatings(apiKey)
      .then((ratings) => setRatings(ratings))
      .catch((error) => console.error("Error fetching movie ratings:", error));
  }, []);

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
    onGenreChange(value);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
    onYearChange(value);
  };

  const handleRatingFromChange = (value) => {
    setRatingFrom(value);
    onRatingChange(value, ratingTo);
  };

  const handleRatingToChange = (value) => {
    setRatingTo(value);
    onRatingChange(ratingFrom, value);
  };

  const resetFilters = () => {
    setSelectedGenre("");
    setSelectedYear("");
    setRatingFrom("");
    setRatingTo("");
    onGenreChange("");
    onYearChange("");
    onRatingChange("", "");
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
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
          label="Rating From"
          placeholder="From"
          data={ratings.map((rating) => ({ value: rating, label: rating }))}
          value={ratingFrom}
          onChange={(event) =>
            handleRatingFromChange(event.currentTarget.value)
          }
        />
        <Select
          style={{ width: "137px" }}
          label="Rating To"
          placeholder="To"
          data={ratings.map((rating) => ({ value: rating, label: rating }))}
          value={ratingTo}
          onChange={(event) => handleRatingToChange(event.currentTarget.value)}
        />

        <div style={{ marginTop: "20px", fontWeight: 500 }}>
          <UnstyledButton style={{ color: "#7B7C88" }} onClick={resetFilters}>
            Reset filters
          </UnstyledButton>
        </div>
      </div>
    </div>
  );
}

export default MovieFilters;
