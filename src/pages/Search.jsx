import { useState } from "react";
import { useMovies } from "../context/MovieContext";
import { Button } from "react-bootstrap";

function Search() {
  const [query, setQuery] = useState("");
  const { searchMovies, searchResults, addMovie } = useMovies();

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(query);
  };

  console.log(searchResults)

  return (
    <div className="container mt-4">
      <h2>Search Movies</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <Button type="submit">Search</Button>
      </form>

      <div className="mt-4">
        {searchResults.length > 0 ? (
          searchResults.map((movie) => (
            <div key={movie.ids.trakt} className="mb-3">
              <h5>{movie.title}</h5>
              <Button variant="success" onClick={() => addMovie({ id: movie.ids.trakt, title: movie.title })}>
                Save
              </Button>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default Search;
