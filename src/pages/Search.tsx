import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Avatar,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { yellow } from "@mui/material/colors";

import {
  changeKeywordReducer,
  searchMovieSaga,
  searchPageSaga,
} from "../store/movieActions";
import { MovieDatabaseState } from "../store/movieReducer";
import { MovieData } from "../utils/types";

interface Props {
  keyword: string;
  loadedMovies: MovieData[];
  nextPageIndex: number;
  lastSearched: string;
  changeKeyword: (keyword: string) => void;
  searchMovie: (movie: string) => void;
  searchPage: (movie: string, page: number) => void;
}

class Search extends Component<Props> {
  render() {
    const {
      keyword,
      loadedMovies,
      nextPageIndex,
      lastSearched,
      changeKeyword,
      searchMovie,
      searchPage,
    } = this.props;
    return (
      <div>
        <h2>Search for your favorite movie:</h2>
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "60%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Input keyword to search for movies"
            onChange={(event) => {
              changeKeyword(event.target.value);
            }}
            value={keyword}
          />
          <IconButton
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={() => searchMovie(keyword)}
          >
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            sx={{ color: yellow[500], p: "10px" }}
            aria-label="Favorite movies"
            href={"/favorite"}
          >
            <StarIcon />
          </IconButton>
        </Paper>
        <List>
          {loadedMovies?.map((movie) => {
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
              </ListItem>
            );
          })}
        </List>
        {nextPageIndex > 0 ? (
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="Load more results"
            onClick={() => searchPage(lastSearched, nextPageIndex)}
          >
            <ExpandMoreIcon sx={{ fontSize: 40 }} />
          </IconButton>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: MovieDatabaseState) => {
  return {
    loadedMovies: state.loadedMovies,
    nextPageIndex: state.nextPageIndex,
    lastSearched: state.lastSearched,
    keyword: state.keyword,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    searchMovie: (movie: string) => dispatch(searchMovieSaga(movie)),
    searchPage: (movie: string, page: number) =>
      dispatch(searchPageSaga({ movieName: movie, page })),
    changeKeyword: (keyword: string) => dispatch(changeKeywordReducer(keyword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
