import React, { useState } from "react";
import { useMovies } from "../context/MovieContext";
import { Link } from "react-router-dom";
import { Card, Button, Form, FormControl } from "react-bootstrap";

const Search = () => {
  const { searchMovies, searchResults } = useMovies();
  const [query, setQuery] = useState("");
  const placeholder = "https://placehold.co/600x400";

  // Helper to get the poster URL from images
  const getPosterUrl = (images) => {
    if (images && images.poster && images.poster.length > 0) {
      const url = images.poster[0];
      return url.startsWith("http") ? url : `https://${url}`;
    }
    return placeholder;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchMovies(query);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Search Movies</h2>
      <Form onSubmit={handleSearch} className="mb-4">
        <FormControl
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="primary" type="submit" className="mt-2">
          Search
        </Button>
      </Form>

      <div className="row">
        {searchResults.map((movie) => (
          <div key={movie.ids.trakt} className="col-md-3 mb-4">
            <Card>
              <Link to={`/movie/${movie.ids.trakt}`}>
                <Card.Img 
                  variant="top" 
                  src={getPosterUrl(movie.images)} 
                  alt={movie.title} 
                  onError={(e) => (e.target.src = placeholder)}
                />
              </Link>
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Link to={`/movie/${movie.ids.trakt}`}>
                  <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
