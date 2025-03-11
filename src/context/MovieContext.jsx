import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import axios from "axios";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const { user } = useAuth();
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (user) {
      fetchSavedMovies();
    } else {
      setSavedMovies([]); // Clear movies on logout
    }
  }, [user]);

  // Fetch saved movies from Firestore
  const fetchSavedMovies = async () => {
    if (!user) return;

    try {
      const q = query(collection(db, "movies"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const movies = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSavedMovies(movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Save a movie to Firestore
  const addMovie = async (movie) => {
    if (!user) return alert("You must be logged in to save movies");

    try {
      await addDoc(collection(db, "movies"), {
        userId: user.uid,
        title: movie.title,
        traktId: movie.id,
      });
      setSavedMovies([...savedMovies, movie]); // Update state after saving
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  // Fetch movies from Trakt API
  const searchMovies = async (query) => {
    if (!query) return;

    try {
      const response = await axios.get(
        `https://api.trakt.tv/search/movie?query=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            "trakt-api-version": "2",
            "trakt-api-key": import.meta.env.VITE_TRAKT_API_KEY,
          },
        }
      );
      setSearchResults(response.data.map((item) => item.movie));
    } catch (error) {
      console.error("Error fetching movies from Trakt API:", error);
    }
  };

  return (
    <MovieContext.Provider value={{ savedMovies, addMovie, searchMovies, searchResults }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
