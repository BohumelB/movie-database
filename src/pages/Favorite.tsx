import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";

import { updateFavoriteMovies } from "../store/movieActions";
import { MovieDatabaseState } from "../store/movieReducer";
import {
  getFavorites,
  removeFromFavorites,
} from "../store/localStorageHandler";
import { MovieData } from "../utils/types";

interface Props {
  favoriteMovies: MovieData[];
  updateFavoriteMovies: (favoriteMovies: MovieData[]) => void;
}

class Favorite extends Component<Props> {
  componentDidMount() {
    this.props.updateFavoriteMovies(getFavorites());
  }

  render() {
    const { favoriteMovies, updateFavoriteMovies } = this.props;

    return (
      <div>
        <h2>Your favorite movies</h2>
        <List>
          {favoriteMovies?.map((movie) => {
            return (
              <ListItem key={movie.imdbID}>
                <Avatar alt="?" src={movie.poster} />
                <ListItemButton
                  component="a"
                  href={`/detail?imdbID=${movie.imdbID}`}
                  sx={{ borderRadius: 25, marginInline: 2 }}
                >
                  <ListItemText
                    primary={movie.title}
                    secondary={movie.type + " (" + movie.year + ")"}
                  />
                </ListItemButton>

                <IconButton
                  aria-label="Remove from favorites"
                  sx={{ color: yellow[500], p: "10px" }}
                  onClick={() => {
                    removeFromFavorites(movie);
                    updateFavoriteMovies(getFavorites());
                  }}
                >
                  <StarIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
        <Button variant="contained" href={"/"}>
          Search
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: MovieDatabaseState) => {
  return {
    favoriteMovies: state.favoriteMovies,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateFavoriteMovies: (favoriteMovies: MovieData[]) =>
      dispatch(updateFavoriteMovies(favoriteMovies)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
