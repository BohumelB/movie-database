import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  addSearchResults,
  GET_MOVIE_DETAIL_SAGA,
  replaceSearchResults,
  SEARCH_MOVIE_SAGA,
  SEARCH_PAGE_SAGA,
  storeMovieData,
} from "./movieActions";
import { getMovieData, searchMovies, searchPage } from "../utils/omdbApi";

function* getMovieDataGenerator(action: any): any {
  const movieData = yield call(getMovieData, action.payload);
  yield put(storeMovieData(movieData));
}

function* searchMovieGenerator(action: any): any {
  const searchResults = yield call(searchMovies, action.payload);
  yield put(replaceSearchResults(searchResults));
}

function* searchPageGenerator(action: any): any {
  const searchResults = yield call(
    searchPage,
    action.payload.movieName,
    action.payload.page
  );
  yield put(addSearchResults(searchResults));
}

const sagas = [
  takeLatest(GET_MOVIE_DETAIL_SAGA, getMovieDataGenerator),
  takeLatest(SEARCH_MOVIE_SAGA, searchMovieGenerator),
  takeLatest(SEARCH_PAGE_SAGA, searchPageGenerator),
];

export default function* sagasRoot() {
  yield all([...sagas]);
}
