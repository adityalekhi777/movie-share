import { createContext, useState, useContext } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState([]);

  const addMovie = (movie) => {
    if (!savedMovies.find((m) => m.id === movie.id)) {
      setSavedMovies([...savedMovies, movie]);
    }
  };

  return (
    <MovieContext.Provider value={{ savedMovies, addMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
