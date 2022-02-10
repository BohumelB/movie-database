import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  addSearchResultsReducer,
  getMovieDetailSaga,
  replaceSearchResultsReducer,
  searchMovieSaga,
  searchPageSaga,
  storeMovieDetailReducer,
} from "./movieActions";
import { getMovieData, searchMovies, searchPage } from "../utils/omdbApi";

function* getMovieDataGenerator(action: any): any {
  const movieData = yield call(getMovieData, action.payload);
  yield put(storeMovieDetailReducer(movieData));
}

function* searchMovieGenerator(action: any): any {
  const searchResults = yield call(searchMovies, action.payload);
  yield put(replaceSearchResultsReducer(searchResults));
}

function* searchPageGenerator(action: any): any {
  const searchResults = yield call(
    searchPage,
    action.payload.movieName,
    action.payload.page
  );
  yield put(addSearchResultsReducer(searchResults));
}

const sagas = [
  takeLatest(getMovieDetailSaga, getMovieDataGenerator),
  takeLatest(searchMovieSaga, searchMovieGenerator),
  takeLatest(searchPageSaga, searchPageGenerator),
];

export default function* sagasRoot() {
  yield all([...sagas]);
}
