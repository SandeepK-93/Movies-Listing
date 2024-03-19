import React, { useState, useEffect } from "react";
import axios from "axios";
import loading from "../assets/pendulum.gif";

export default function MoviesContainer() {
  const [selected_genre, setSelectedGenre] = useState();
  const [moviesList, setMoviesList] = useState([]);
  const [showLoading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const genre_array = [
    "animation",
    "classic",
    "comedy",
    "drama",
    "horror",
    "family",
    "mystery",
    "western",
  ];

  useEffect(() => {
    setSelectedGenre(genre_array[0]);
    fetchMovies(genre_array[0]);
  }, []);

  let fetchMovies = (genre) => {
    // TODO: Add a call to fetch movies
    console.log("data fetch");
    axios.get(`https://api.sampleapis.com/movies/${genre}`).then((response) => {
      setLoading(false);
      setMoviesList(response.data);
    });
  };

  let changeGenre = (genre_id) => {
    setLoading(true);
    if (selected_genre !== genre_id) {
      setSelectedGenre(genre_id);
      fetchMovies(genre_id);
    }
  };

  let handleChange = (e) => {
    setFilterText(e.target.value);
    setFilteredMovies(
      moviesList.filter((movie) =>
        movie.title.toLowerCase().includes(filterText.toLowerCase()),
      ),
    );
  };

  return (
    <div className="m-container">
      <div className="directory-side">
        {genre_array.map((genre) => (
          <a
            onClick={changeGenre.bind(this, genre)}
            className={`item ${selected_genre === genre ? "active" : ""}`}
          >
            {genre.split("-").length > 1
              ? genre.split("-")[0]
                ? genre.replace("-", " ")
                : genre
              : genre}
          </a>
        ))}
      </div>
      <div className="movies-list-view">
        <p className="genre">Genre: {selected_genre}</p>
        <div className="search">
          <input
            type="search"
            value={filterText}
            placeholder="Search"
            onChange={handleChange}
          />
        </div>
        <div className="movie-card-container">
          {showLoading ? (
            <div className="loading-conatiner">
              <img src={loading} alt="Loading" />
            </div>
          ) : (
            (filterText === "" ? moviesList : filteredMovies).map((movie) => (
              <div className="movie-card" key={movie.id}>
                <div className="movie-image">
                  <img src={movie.posterURL} alt={movie.posterURL} />
                </div>
                <p className="movie-name">{movie.title}</p>
                <p className="movie-date">IMDB: {movie.imdbId}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
