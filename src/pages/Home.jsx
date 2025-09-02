import React, { useState } from "react";
import { useMovies } from "../context/MovieContext";
import { Link } from "react-router-dom";
import styles from './Home.module.css';
import Slider from '../components/Slider';
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { popularMovies, addMovie } = useMovies();
  const { theme } = useTheme();
  const placeholder = "https://placehold.co/600x400";
  const [saveMessage, setSaveMessage] = useState("");

  const getImageUrl = (images) => {
    if (images && images.poster && images.poster.length > 0) {
      const url = images.poster[0];
      return url.startsWith("http") ? url : `https://${url}`;
    }
    return placeholder;
  };

  const handleSave = async (movie) => {
    try {
      await addMovie({
        ...movie,
        poster: getImageUrl(movie.images)
      });
      setSaveMessage(`Saved "${movie.title}"!`);
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error("Error saving movie:", error);
      setSaveMessage("Error saving movie");
    }
  };

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.dark : ''}`}>
      <h1 className={styles.title}>Welcome to Movie Share</h1>
      <Slider />
      <div className={styles.moviesContainer}>
        <h2>Popular Movies</h2>
        {saveMessage && <div className={styles.alert}>{saveMessage}</div>}
        <div className={styles.movieGrid}>
          {popularMovies.map((movie) => (
            <div key={movie.ids.trakt} className={styles.movieCard}>
              <Link to={`/movie/${movie.ids.slug}`}>
                <img
                  src={getImageUrl(movie.images)}
                  onError={(e) => (e.target.src = placeholder)}
                  alt={movie.title}
                  className={styles.movieImage}
                />
              </Link>
              <div className={styles.movieCardBody}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <div className={styles.buttonGroup}>
                  <button className={styles.button} onClick={() => handleSave(movie)}>
                    Save
                  </button>
                  <Link to={`/movie/${movie.ids.slug}`} className={styles.button}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
