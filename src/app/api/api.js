import { apiKey, baseUrl } from "../config";

export async function fetchMovies(
  genre = "",
  year = "",
  ratingFrom = "",
  ratingTo = "",
  sortBy = ""
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

  if (sortBy) {
    url.searchParams.append("sort_by", sortBy);
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
    console.error("Error fetching movie genres:", error);
    throw new Error("Failed to fetch movie genres");
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

export async function fetchMovieRatings(apiKey, minRating, maxRating) {
  const url = `${baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Error fetching movie ratings: " + error.message);
  }
}

export async function fetchMovieSortOptions() {
  const url = new URL(`${baseUrl}/discover/movie`);
  url.searchParams.append("api_key", apiKey);
  url.searchParams.append("include_adult", "false");
  url.searchParams.append("include_video", "false");
  url.searchParams.append("language", "en-US");
  url.searchParams.append("page", "1");
  url.searchParams.append("sort_by", "popularity.desc");
  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url.toString(), options);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch movie sort options: ${response.statusText}`
      );
    }
    const data = await response.json();

    const sortOptions = [
      { value: "popularity.desc", label: "Most popular" },
      { value: "popularity.asc", label: "Least popular" },
      { value: "vote_average.desc", label: "Most rated" },
      { value: "vote_average.asc", label: "Least rated" },
      { value: "vote_count.desc", label: "Most voted" },
      { value: "vote_count.asc", label: "Least voted" },
      { value: "primary_release_date.desc", label: "Latest released" },
      { value: "primary_release_date.asc", label: "Earliest released" },
    ];

    return sortOptions;
  } catch (error) {
    throw new Error("Error fetching movie sort options: " + error.message);
  }
}

export async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=videos`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching movie details: ${error.message}`);
    throw new Error(`Error fetching movie details: ${error.message}`);
  }
}
