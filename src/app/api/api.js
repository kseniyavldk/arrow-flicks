export async function fetchMovies(genre = "", year = "") {
  const apiKey = "ca63987f2e3432d94a2064d1e1ff4cf8";
  const baseUrl = "https://api.themoviedb.org/3/discover/movie";
  const url = new URL(baseUrl);

  if (genre) {
    url.searchParams.append("with_genres", genre);
  }

  if (year) {
    url.searchParams.append("year", year);
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

export async function fetchMovieGenres(apiKey) {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

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
