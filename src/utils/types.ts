export interface MovieData {
  title: string;
  year: string;
  type: string;
  imdbID: string;
  poster: string;
}

export interface MovieDetails extends MovieData {
  actors: string;
  country: string;
  director: string;
  genre: string;
  language: string;
  released: string;
  runtime: string;
  writer: string;
}

export interface SearchResults {
  movies: MovieData[];
  nextPageIndex: number;
  searchedKeyword?: string;
}
