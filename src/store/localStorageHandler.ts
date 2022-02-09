import { MovieData } from "../utils/types";

const FAVORITE_MOVIES = "FAVORITE_MOVIES";

export function addToFavorites(movie: MovieData) {
  const favoriteMovies = getFavorites();
  if (
    !favoriteMovies.find(
      (favoriteMovie) => favoriteMovie.imdbID === movie.imdbID
    )
  ) {
    favoriteMovies.push(movie);
    localStorage.setItem(FAVORITE_MOVIES, JSON.stringify(favoriteMovies));
  }
}

export function removeFromFavorites(movie: MovieData) {
  const favoriteMovies = getFavorites();
  if (
    !!favoriteMovies.find(
      (favoriteMovie) => favoriteMovie.imdbID === movie.imdbID
    )
  ) {
    const newFavoriteMovies = favoriteMovies.filter(
      (favoriteMovie) => favoriteMovie.imdbID !== movie.imdbID
    );
    localStorage.setItem(FAVORITE_MOVIES, JSON.stringify(newFavoriteMovies));
  }
}

export function getFavorites(): MovieData[] {
  const favoriteMovies = localStorage.getItem(FAVORITE_MOVIES);
  return favoriteMovies ? JSON.parse(favoriteMovies) : [];
}
