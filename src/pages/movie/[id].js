import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchMovieDetails } from "../../app/api/api.js";

function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchMovie() {
        try {
          const token =
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTYzOTg3ZjJlMzQzMmQ5NGEyMDY0ZDFlMWZmNGNmOCIsInN1YiI6IjY2MzM2ZTk2ZDU1YzNkMDEyM2YzMTU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AOr7pB5ISa9nsLxeZyrO8JeJlvTzWSayKtgsjLVivwc";
          const movieData = await fetchMovieDetails(id, token);
          setMovie(movieData);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }

      fetchMovie();
    }
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieDetails;
