import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import { Button, IconButton, Paper } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { yellow } from "@mui/material/colors";

import { getMovieData, updateFavoriteMovies } from "../store/movieActions";
import { MovieDatabaseState } from "../store/movieReducer";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "../store/localStorageHandler";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Detail() {
  const query = useQuery();
  const imdbID = query.get("imdbID") || "";

  const isFavorite = useSelector(
    (state: MovieDatabaseState) =>
      !!state.favoriteMovies.find((movie) => movie.imdbID === imdbID)
  );
  const movie = useSelector((state: MovieDatabaseState) => state.movieDetails);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieData(imdbID));
    dispatch(updateFavoriteMovies(getFavorites()));
  }, []);

  return movie ? (
    <div>
      <Paper
        sx={{
          p: "4px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <h2>{movie.title}</h2>
          {isFavorite ? (
            <IconButton
              aria-label="Remove from favorites"
              sx={{ color: yellow[500], p: "10px", alignSelf: "center" }}
              onClick={() => {
                removeFromFavorites(movie);
                dispatch(updateFavoriteMovies(getFavorites()));
              }}
            >
              <StarIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="Add to favorites"
              sx={{ color: yellow[500], p: "10px", alignSelf: "center" }}
              onClick={() => {
                addToFavorites(movie);
                dispatch(updateFavoriteMovies(getFavorites()));
              }}
            >
              <StarBorderIcon />
            </IconButton>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {movie.poster && movie.poster !== "N/A" ? (
            <img
              src={movie.poster}
              alt={"Poster for movie " + movie.title}
              style={{
                borderRadius: 25,
                margin: 2,
                border: 2,
                borderStyle: "outset",
              }}
            />
          ) : null}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>{"Media type: " + movie.type}</span>
            <span>{"Genre: " + movie.genre}</span>
            <span>{"Release date: " + movie.released}</span>
            <span>{"Length: " + movie.runtime}</span>
            <span>{"Language: " + movie.language}</span>
            <span>{"Country: " + movie.country}</span>
            <span>{"Directed by: " + movie.director}</span>
            <span>{"Written by: " + movie.writer}</span>
            <span>{"Actors: " + movie.actors}</span>
          </div>
        </div>
      </Paper>
      <Button
        variant="contained"
        href={"/"}
        style={{
          borderBottomLeftRadius: 25,
        }}
      >
        Search
      </Button>
      <Button
        variant="contained"
        href={"/favorite"}
        style={{
          borderBottomRightRadius: 25,
        }}
      >
        Favorites
      </Button>
    </div>
  ) : null;
}

export default Detail;
