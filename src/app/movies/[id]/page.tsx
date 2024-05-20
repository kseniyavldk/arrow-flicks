"use client";
import { notFound } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Container, Stack, Loader, Breadcrumbs, rem } from "@mantine/core";
import { fetchMovieDetails, fetchMovieGenres } from "@/app/api/api.js";
import { token } from "@/app/config.js";
import { Movie, Genre, Video } from "@/app/types";
import styles from "./page.module.css";
import MovieDetailsCard from "@/app/movie-trailer/page";
import { CompanyMovieProduction } from "@/app/types";
import MovieCard from "@/app/movie-card/page";

type MovieDetailsProps = {
  params: { id: string };
};

function MovieDetails({ params }: MovieDetailsProps) {
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [productionData, setProductionData] = useState<
    CompanyMovieProduction[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (params.id) {
          const movieData = await fetchMovieDetails(params.id + token);
          setMovieDetails(movieData);
          setProductionData(movieData.production_companies);
          if (movieData.videos.results.length > 0) {
            const trailerData = movieData.videos.results.find(
              (video: Video) => video.type === "Trailer"
            );
            if (trailerData) {
              setTrailer(trailerData);
            }
          }
        }
        const genresData = await fetchMovieGenres();
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [params.id]);

  if (!movieDetails) {
    return (
      <div className={styles.loaderContainer}>
        <Loader color="grape" />
      </div>
    );
  }

  if (!movieDetails) {
    notFound();
  }

  return (
    <Container my={rem(35)} px="xmd" size={rem(800)}>
      <Stack gap="xl">
        <Breadcrumbs c="#9854F6" separatorMargin="md" mt="xs">
          Movies
        </Breadcrumbs>
        <MovieCard params={params} />

        <MovieDetailsCard
          movieId={parseInt(params.id)}
          trailerUrl={trailer}
          description={movieDetails.overview}
          production={productionData}
        />
      </Stack>
    </Container>
  );
}

export default MovieDetails;
