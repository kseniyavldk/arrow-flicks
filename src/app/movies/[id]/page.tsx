"use client";
import React, { useState, useEffect } from "react";
import { Image, Text, Group } from "@mantine/core";
import { fetchMovieDetails, fetchMovieGenres } from "@/app/api/api.js";
import { token } from "@/app/config.js";

interface Movie {
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  budget: number;
  revenue: number;
  genre_ids: number[];
}

interface Genre {
  id: string;
  name: string;
}

function MovieDetails({ params }: { params: { id: string } }) {
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (params.id) {
          const movieData = await fetchMovieDetails(params.id + token);
          setMovieDetails(movieData);
        }

        const genresData = await fetchMovieGenres();
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [params.id]);

  const getGenreNames = (movie: Movie) => {
    if (!genres.length || !movie || !movie.genre_ids) return "";

    const genreNames = movie.genre_ids.map((id) => {
      const genre = genres.find((genre) => genre.id === String(id));
      return genre ? genre.name : "";
    });

    return genreNames.join(", ");
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Group>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          height={170}
          alt={movieDetails.title}
        />
        <Text
          size="lg"
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#9854F6",
            cursor: "pointer",
          }}
        >
          {movieDetails.title}
        </Text>
        <Text size="md" style={{ color: "#7B7C88" }}>
          {movieDetails.release_date && movieDetails.release_date.split("-")[0]}
        </Text>
        <Text size="lg" fw={700} style={{ color: "#000000" }}>
          {movieDetails.vote_average.toFixed(1)}
        </Text>
        <Text size="md" style={{ color: "#7B7C88" }}>
          {movieDetails.runtime}
        </Text>
        <Text size="md" style={{ color: "#7B7C88" }}>
          {movieDetails.release_date}
        </Text>
        <Text size="md" style={{ color: "#7B7C88" }}>
          {movieDetails.budget}
        </Text>
        <Text size="md" style={{ color: "#7B7C88" }}>
          {movieDetails.revenue}
        </Text>
        <Text size="md" style={{ color: "#7B7C88" }}>
          Genres{" "}
          <span
            style={{
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            {getGenreNames(movieDetails)}
          </span>
        </Text>
      </Group>
    </div>
  );
}

export default MovieDetails;
