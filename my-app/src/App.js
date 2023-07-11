import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";
//  API key: b78da15a   daa8591b
const API_URL = "http://www.omdbapi.com?apikey=b78da15a";
const movie1 = {
  Title: "Batman Begins",
  Year: "2005",
  imdbID: "tt0372784",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
};

const App = () => {
  const [input, setInput] = useState();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    searchMovies( {input});
  }, []);
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Search for movies"
        />

        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(input)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found </h2>
        </div>
      )}
    </div>
  );
};

export default App;
