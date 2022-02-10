import { createAction } from "@reduxjs/toolkit";

import { MovieData, MovieDetails, SearchResults } from "../utils/types";

export const getMovieDetailSaga = createAction<string>("GET_MOVIE_DETAIL_SAGA");
export const storeMovieDetailReducer = createAction<MovieDetails>(
  "STORE_MOVIE_DETAIL_REDUCER"
);
export const searchMovieSaga = createAction<string>("SEARCH_MOVIE_SAGA");
export const replaceSearchResultsReducer = createAction<SearchResults>(
  "REPLACE_SEARCH_RESULTS_REDUCER"
);
export const searchPageSaga =
  createAction<{ movieName: string; page: number }>("SEARCH_PAGE_SAGA");
export const addSearchResultsReducer = createAction<SearchResults>(
  "ADD_SEARCH_RESULTS_REDUCER"
);
export const updateFavoriteMoviesReducer = createAction<MovieData[]>(
  "UPDATE_FAVORITE_MOVIES_REDUCER"
);
export const changeKeywordReducer = createAction<string>(
  "CHANGE_KEYWORD_REDUCER"
);
