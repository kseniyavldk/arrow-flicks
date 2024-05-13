import { apiKey, token } from "../config";

const baseUrl = "https://api.themoviedb.org/3";

export async function fetchMovies(
  genre = "",
  year = "",
  ratingFrom = "",
  ratingTo = ""
) {
  const url = new URL(`${baseUrl}/discover/movie`);

  if (genre) {
    url.searchParams.append("with_genres", genre);
  }

  if (year) {
    url.searchParams.append("primary_release_year", year);
  }

  if (ratingFrom !== undefined && ratingFrom !== "") {
    url.searchParams.append("vote_average.gte", ratingFrom);
  }

  if (ratingTo !== undefined && ratingTo !== "") {
    url.searchParams.append("vote_average.lte", ratingTo);
  }

  url.searchParams.append("api_key", apiKey);

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching movies: " + error.message);
  }
}

export async function fetchMovieGenres() {
  const url = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    const genres = data.genres.map((genre) => ({
      id: String(genre.id),
      name: genre.name,
    }));

    return genres;
  } catch (error) {
    throw new Error("Error fetching movie genres: " + error.message);
  }
}

export async function fetchMoviesYears() {
  const url = new URL(`${baseUrl}/discover/movie`);
  url.searchParams.append("api_key", apiKey);
  url.searchParams.append("page", 1);

  try {
    const response = await fetch(url);
    const data = await response.json();

    const years = Array.from(
      new Set(
        data.results.map((movie) => new Date(movie.release_date).getFullYear())
      )
    );

    return years.map((year) => ({ value: String(year), label: String(year) }));
  } catch (error) {
    throw new Error("Error fetching movie release years: " + error.message);
  }
}

export async function fetchMovieRatings(apiKey) {
  const url = `${baseUrl}/movie/ratings?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    const ratings = data.map((rating) => ({
      value: String(rating.value),
      label: String(rating.label),
    }));

    return ratings;
  } catch (error) {
    throw new Error("Error fetching movie ratings: " + error.message);
  }
}

export async function fetchMovieDetails(movieId) {
  const url = `${baseUrl}/movie/${movieId}`;
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching movie details: ${error.message}`);
  }
}
