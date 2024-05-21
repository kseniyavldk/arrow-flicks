export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  runtime: number;
  budget: number;
  revenue: number;
  genre_ids: number[];
  genres: Genre[];
  description: string;
  overview: string;
}

export interface Genre {
  id: string;
  name: string;
}
export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  iso_639_1: string;
  iso_3166_1: string;
  published_at: string;
}

export type CompanyMovieProduction = {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
};

export interface SearchParams {
  sort_by?: string;
  genre?: string;
  year?: string;
  ratingFrom?: string;
  ratingTo?: string;
}
