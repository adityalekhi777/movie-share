import React, { useState } from "react";
import { useMovies } from "../context/MovieContext";
import { Link } from "react-router-dom";
import styles from './Search.module.css';
import { useTheme } from "../context/ThemeContext";

const Search = () => {
  const { searchMovies, searchResults } = useMovies();
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const placeholder = "https://placehold.co/600x400";

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
    <div className={`${styles.container} ${theme === 'dark' ? styles.dark : ''}`}>
      <h2 className={styles.title}>Search Movies</h2>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      <div className={styles.movieGrid}>
        {searchResults.map((movie) => (
          <div key={movie.ids.trakt} className={styles.movieCard}>
            <Link to={`/movie/${movie.ids.trakt}`}>
              <img 
                src={getPosterUrl(movie.images)} 
                alt={movie.title} 
                onError={(e) => (e.target.src = placeholder)}
                className={styles.movieImage}
              />
            </Link>
            <div className={styles.movieCardBody}>
              <h3 className={styles.movieTitle}>{movie.title}</h3>
              <Link to={`/movie/${movie.ids.trakt}`} className={styles.button}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
