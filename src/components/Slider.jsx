import React, { useState, useEffect } from 'react';
import styles from './Slider.module.css';
import { useMovies } from '../context/MovieContext';

const Slider = () => {
  const { popularMovies } = useMovies();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (popularMovies.length > 0) {
        setCurrentIndex(prev => (prev + 1) % popularMovies.length);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [popularMovies]);

  const prevSlide = () => {
    if (popularMovies.length > 0) {
      setCurrentIndex(prev => (prev - 1 + popularMovies.length) % popularMovies.length);
    }
  };

  const nextSlide = () => {
    if (popularMovies.length > 0) {
      setCurrentIndex(prev => (prev + 1) % popularMovies.length);
    }
  };

  if (!popularMovies || popularMovies.length === 0) {
    return <div className={styles.slider}>Loading popular movies...</div>;
  }

  const movie = popularMovies[currentIndex];
  const imageUrl = movie?.images?.poster?.full || movie?.images?.poster?.medium || '';

  return (
    <div className={styles.slider}>
      <button className={styles.navButton} onClick={prevSlide}>&laquo;</button>
      <img className={styles.slideImage} src={imageUrl} alt={movie.title} />
      <button className={styles.navButton} onClick={nextSlide}>&raquo;</button>
    </div>
  );
};

export default Slider;
