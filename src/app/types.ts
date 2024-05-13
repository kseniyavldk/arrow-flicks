export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  budget: number;
  revenue: number;
  genre_ids: number[];
}

export interface Genre {
  id: string;
  name: string;
}
