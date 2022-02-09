import {
  REPLACE_SEARCH_RESULTS_REDUCER,
  ADD_SEARCH_RESULTS_REDUCER,
  STORE_MOVIE_DETAIL_REDUCER,
  CHANGE_KEYWORD,
  UPDATE_FAVORITE_MOVIES_REDUCER,
} from "./movieActions";
import { MovieData, MovieDetails } from "../utils/types";

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

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state: MovieDatabaseState = initialState,
  action: any
) {
  switch (action.type) {
    case STORE_MOVIE_DETAIL_REDUCER: {
      return {
        ...state,
        movieDetails: action.payload,
      };
    }
    case REPLACE_SEARCH_RESULTS_REDUCER: {
      return {
        ...state,
        loadedMovies: action.payload.movies,
        nextPageIndex: action.payload.nextPageIndex,
        lastSearched: action.payload.searchedKeyword,
      };
    }
    case ADD_SEARCH_RESULTS_REDUCER: {
      return {
        ...state,
        loadedMovies: state.loadedMovies.concat(action.payload.movies),
        nextPageIndex: action.payload.nextPageIndex,
      };
    }
    case UPDATE_FAVORITE_MOVIES_REDUCER: {
      return {
        ...state,
        favoriteMovies: action.payload,
      };
    }
    case CHANGE_KEYWORD: {
      return {
        ...state,
        keyword: action.payload,
      };
    }
    default:
      return state;
  }
}
