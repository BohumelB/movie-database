import { MovieData, SearchResults } from "../utils/types";

export const GET_MOVIE_DETAIL_SAGA = "GET_MOVIE_DETAIL_SAGA";
export const STORE_MOVIE_DETAIL_REDUCER = "STORE_MOVIE_DETAIL_REDUCER";
export const SEARCH_MOVIE_SAGA = "SEARCH_MOVIE_SAGA";
export const REPLACE_SEARCH_RESULTS_REDUCER = "REPLACE_SEARCH_RESULTS_REDUCER";
export const SEARCH_PAGE_SAGA = "SEARCH_PAGE_SAGA";
export const ADD_SEARCH_RESULTS_REDUCER = "ADD_SEARCH_RESULTS_REDUCER";
export const UPDATE_FAVORITE_MOVIES_REDUCER = "UPDATE_FAVORITE_MOVIES_REDUCER";
export const CHANGE_KEYWORD = "CHANGE_KEYWORD";

export function getMovieData(movieName: string) {
  return { type: GET_MOVIE_DETAIL_SAGA, payload: movieName };
}

export function storeMovieData(movieData: MovieData) {
  return { type: STORE_MOVIE_DETAIL_REDUCER, payload: movieData };
}

export function searchMovie(movieName: string) {
  return { type: SEARCH_MOVIE_SAGA, payload: movieName };
}

export function replaceSearchResults(searchResults: SearchResults) {
  return { type: REPLACE_SEARCH_RESULTS_REDUCER, payload: searchResults };
}

export function searchPage(movieName: string, page: number) {
  return { type: SEARCH_PAGE_SAGA, payload: { movieName, page } };
}

export function addSearchResults(searchResults: SearchResults) {
  return { type: ADD_SEARCH_RESULTS_REDUCER, payload: searchResults };
}

export function updateFavoriteMovies(favoriteMovies: MovieData[]) {
  return { type: UPDATE_FAVORITE_MOVIES_REDUCER, payload: favoriteMovies };
}

export function changeKeyword(keyword: string) {
  return { type: CHANGE_KEYWORD, payload: keyword };
}
