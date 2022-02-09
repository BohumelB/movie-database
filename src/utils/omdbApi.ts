import axios from "axios";

import { MovieData, MovieDetails, SearchResults } from "./types";

const API_KEY = "d80c561c";
const BASE_URL = "http://www.omdbapi.com/?apikey=" + API_KEY;

export const searchMovies = async (keyword: string): Promise<SearchResults> => {
  return axios
    .get(BASE_URL + '&s="' + keyword + '"')
    .then(function (response: any) {
      return {
        movies: processSearchResponse(response),
        nextPageIndex: computePage(1, response.data.totalResults),
        searchedKeyword: keyword,
      };
    })
    .catch((error) => {
      return error;
    });
};

export const searchPage = async (
  keyword: string,
  page: number
): Promise<SearchResults> => {
  return axios
    .get(BASE_URL + '&s="' + keyword + '"&page=' + page)
    .then(function (response: any) {
      return {
        movies: processSearchResponse(response),
        nextPageIndex: computePage(page, response.data.totalResults),
      };
    })
    .catch((error) => {
      return error;
    });
};

export const getMovieData = async (imdbID: string): Promise<MovieDetails> => {
  return axios
    .get(BASE_URL + "&i=" + imdbID)
    .then(function (response: any) {
      return processDetailResponse(response);
    })
    .catch((error) => {
      return error;
    });
};

function processSearchResponse(response: any): MovieData[] {
  return response.data.Search.map((movieData: any) => {
    return {
      title: movieData.Title,
      year: movieData.Year,
      type: movieData.Type,
      imdbID: movieData.imdbID,
      poster: movieData.Poster,
    };
  });
}

function processDetailResponse(response: any): MovieDetails {
  const movieData = response.data;
  return {
    title: movieData.Title,
    year: movieData.Year,
    type: movieData.Type,
    imdbID: movieData.imdbID,
    poster: movieData.Poster,
    actors: movieData.Actors,
    country: movieData.Country,
    director: movieData.Director,
    genre: movieData.Genre,
    language: movieData.Language,
    released: movieData.Released,
    runtime: movieData.Runtime,
    writer: movieData.Writer,
  };
}

function computePage(currentPage: number, resultAmount: number): number {
  return resultAmount - currentPage * 10 > 0 ? currentPage + 1 : 0;
}
