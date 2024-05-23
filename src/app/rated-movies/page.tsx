"use client";
import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  Container,
  Group,
  Title,
  rem,
  Grid,
  Box,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import MovieCard from "../components/MovieCard";
import FormSearch from "../components/FormSearch";
import { fetchMovieDetails } from "@/app/api/api";

interface RatedMovie {
  id: string;
  rating: number;
  title: string;
}

const RatedMovies = () => {
  const [ratedMovies, setRatedMovies] = useState<RatedMovie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<RatedMovie[]>([]);

  useEffect(() => {
    const getRatedMovies = async () => {
      const ratedMovies = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("movie_")) {
          const movieId = key.split("_")[1];
          const movieRating = localStorage.getItem(key);
          const rating = movieRating ? parseInt(movieRating) : 0;
          const movieDetails = await fetchMovieDetails(movieId);
          ratedMovies.push({ ...movieDetails, rating });
        }
      }
      setRatedMovies(ratedMovies);
      setFilteredMovies(ratedMovies);
    };

    getRatedMovies();
  }, []);

  const handleSearch = (query: string) => {
    if (query === "") {
      setFilteredMovies(ratedMovies);
    } else {
      const filtered = ratedMovies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

  return (
    <Container my={rem(40)} px="xmd" size={rem(1000)}>
      <Group justify="space-between" gap="md" mb={rem(40)}>
        <Title order={1}>Rated movies</Title>
        <FormSearch onSearch={handleSearch} />
      </Group>

      {filteredMovies.length > 0 ? (
        <Grid gutter="md">
          {filteredMovies.map((movie) => (
            <Grid.Col span={6} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "70vh",
            textAlign: "center",
          }}
        >
          <Image
            src="/images/loading.png"
            alt="Loading"
            width={500}
            height={400}
          />
          <Text
            style={{ marginTop: "20px", fontSize: "20px", fontWeight: 600 }}
          >
            You haven&apos;t rated any films yet
          </Text>
          <Link href="/" passHref>
            <Button
              style={{
                marginTop: "20px",
                background: "#9854F6",
                width: "122px",
                height: "40px",
                padding: "10px 20px",
                gap: "10px",
                borderRadius: "8px",
              }}
            >
              Find movies
            </Button>
          </Link>
        </Box>
      )}
    </Container>
  );
};

export default RatedMovies;
