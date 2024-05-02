"use client";
import React, { useState, useEffect } from "react";
import { Select, IconChevronDown } from "@mantine/core";

function GenreSelect() {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: "Bearer ca63987f2e3432d94a2064d1e1ff4cf8",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGenres(data.genres);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <Select
      label="Genres"
      placeholder="Select genre"
      //data={isLoading ? [] : genres.map((genre) => genre.name)}
      rightSection={
        <IconChevronDown style={{ width: "1rem", height: "1rem" }} />
      }
    />
    /*  <Select
            rightSection={
              <IconChevronDown style={{ width: "1rem", height: "1rem" }} />
            }
            label="Genres"
            placeholder="Select genre"
            data={[]}
          /> */
  );
}

export default GenreSelect;
