"use client";
import React, { useEffect, useState } from "react";
import { Select, UnstyledButton, Text, NumberInput, rem } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { fetchMovieGenres, fetchMoviesYears } from "@/app/api/api.js";
import { Genre } from "../types";

function MovieFilters({
  onGenreChange,
  onYearChange,
  onRatingChange,
}: {
  onGenreChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onRatingChange: (minRating: string, maxRating: string) => void;
}) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [releaseYears, setReleaseYears] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<string>("");
  const [maxRating, setMaxRating] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    fetchMovieGenres()
      .then((data: Genre[]) => setGenres(data))
      .catch((error: Error) =>
        console.error("Error fetching movie genres:", error)
      );

    fetchMoviesYears()
      .then((yearsData: { value: string; label: string }[]) => {
        const years = yearsData.map((year) => year.value);
        setReleaseYears(years);
      })
      .catch((error: Error) =>
        console.error("Error fetching movie release years:", error)
      );
  }, []);

  const handleGenreChange = (value: string | null) => {
    if (value !== null) {
      setSelectedGenre(value);
      onGenreChange(value);
    }
  };

  const handleYearChange = (value: string | null) => {
    if (value !== null) {
      setSelectedYear(value);
      onYearChange(value);
    }
  };

  const handleRatingChange = (minRating: string, maxRating: string) => {
    setMinRating(minRating);
    setMaxRating(maxRating);
    onRatingChange(minRating, maxRating);
  };

  const resetFilters = () => {
    setSelectedGenre("");
    setSelectedYear("");
    setMinRating("");
    setMaxRating("");
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
        <NumberInput
          maw={rem(138)}
          max={10}
          min={0}
          step={1}
          allowNegative={false}
          decimalScale={1}
          size="md"
          radius="md"
          label="Rating From"
          placeholder="From"
          onChange={(value) => handleRatingChange(String(value), maxRating)}
        />
        <NumberInput
          maw={rem(138)}
          max={10}
          min={0}
          step={1}
          size="md"
          radius="md"
          label="Rating To"
          placeholder="To"
          onChange={(value) => handleRatingChange(minRating, String(value))}
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
