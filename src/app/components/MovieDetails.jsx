import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Image, Text } from "@mantine/core";
import { fetchMovieDetails } from "../api/api.js";
import { token } from "../config.js";

function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        if (id) {
          const movieData = await fetchMovieDetails(id, token);
          setMovie(movieData);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>{movie.poster_path}</p>
      <p>{movie.popularity}</p>
      <p>{movie.overview}</p>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        height={170}
        alt={movie.title}
      />
      <Text
        as="a"
        size="lg"
        weight={700}
        style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "#9854F6",
          cursor: "pointer",
        }}
      >
        {movie.title}
      </Text>
      <Text size="md" style={{ color: "#7B7C88" }}>
        {movie.release_date && movie.release_date.split("-")[0]}
      </Text>
      <Text size="lg" fw={700} style={{ color: "#000000" }}>
        {movie.vote_average.toFixed(1)}
      </Text>
    </div>
  );
}

export default MovieDetails;
