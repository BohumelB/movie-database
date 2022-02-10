import {
  addSearchResultsReducer,
  changeKeywordReducer,
  replaceSearchResultsReducer,
  storeMovieDetailReducer,
  updateFavoriteMoviesReducer,
} from "./movieActions";
import { MovieData, MovieDetails } from "../utils/types";
import { createReducer } from "@reduxjs/toolkit";

export type MovieDatabaseState = {
  favoriteMovies: MovieData[];
  loadedMovies: MovieData[];
  nextPageIndex: number;
  lastSearched: string;
  keyword: string;
  detailMovieImdbID: string;
  movieDetails: MovieDetails;
};

const initialState: MovieDatabaseState = {
  favoriteMovies: [],
  loadedMovies: [],
  nextPageIndex: 0,
  lastSearched: "",
  detailMovieImdbID: "",
  keyword: "",
  movieDetails: {
    title: "",
    year: "",
    type: "",
    imdbID: "",
    poster: "",
    actors: "",
    country: "",
    director: "",
    genre: "",
    language: "",
    released: "",
    runtime: "",
    writer: "",
  },
};

const SearchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(storeMovieDetailReducer, (state, { payload: movieData }) => {
      return {
        ...state,
        movieDetails: movieData,
      };
    })
    .addCase(
      replaceSearchResultsReducer,
      (state, { payload: searchResults }) => {
        return {
          ...state,
          loadedMovies: searchResults.movies,
          nextPageIndex: searchResults.nextPageIndex,
          lastSearched: searchResults.searchedKeyword || "",
        };
      }
    )
    .addCase(addSearchResultsReducer, (state, { payload: searchResults }) => {
      return {
        ...state,
        loadedMovies: state.loadedMovies.concat(searchResults.movies),
        nextPageIndex: searchResults.nextPageIndex,
      };
    })
    .addCase(
      updateFavoriteMoviesReducer,
      (state, { payload: favoriteMovies }) => {
        return {
          ...state,
          favoriteMovies,
        };
      }
    )
    .addCase(changeKeywordReducer, (state, { payload: keyword }) => {
      return {
        ...state,
        keyword,
      };
    });
});

export default SearchReducer;
