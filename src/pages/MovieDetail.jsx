import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetail.css";

const MovieDetail = () => {
  // 'id' is the movie slug (e.g., "deadpool-2016")
  const {movieId:id} = useParams();
  const [movie, setMovie] = useState(null);
  const [people, setPeople] = useState(null);
  const [loading, setLoading] = useState(true);
  const placeholder = "https://placehold.co/600x400";
  
  const traktAPIKey = import.meta.env.VITE_TRAKT_API_KEY;
  const traktBaseURL = "https://api.trakt.tv";

  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movie details using the slug with extended images and full info
        const movieRes = await axios.get(
          "https://api.trakt.tv/movies/" + id + "?extended=full,images",
          {
            headers: {
              "Content-Type": "application/json",
              "trakt-api-version": "2",
              "trakt-api-key": traktAPIKey,
            },
          }
        );
        console.log("Movie response:", movieRes.data);
        setMovie(movieRes.data);

        // Fetch movie cast and crew data
        const peopleRes = await axios.get(
          `${traktBaseURL}/movies/${id}/people`,
          {
            headers: {
              "Content-Type": "application/json",
              "trakt-api-version": "2",
              "trakt-api-key": traktAPIKey,
            },
          }
        );
        setPeople(peopleRes.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, traktAPIKey]);

  if (loading) return <p>Loading movie details...</p>;
  if (!movie) return <p>Movie not found.</p>;

  // Helper function to get the poster URL from the movie images
  const getPoster = () => {
    if (movie.images && movie.images.poster && movie.images.poster.length > 0) {
      const posterUrl = movie.images.poster[0];
      return posterUrl.startsWith('http') ? posterUrl : `https://${posterUrl}`;
    }
    return placeholder;
  };

  // New function to get the background image from the API using the banner image
  const getBackground = () => {
    if (movie.images && movie.images.banner && movie.images.banner.length > 0) {
      const bannerUrl = movie.images.banner[0];
      return bannerUrl.startsWith('http') ? bannerUrl : `https://${bannerUrl}`;
    }
    return ''; // default background if none available
  };

  return (
    <div className="movie-detail-container" style={{ backgroundImage: `url(${getBackground()})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="movie-detail-card">
        <img
          className="movie-detail-poster"
          src={getPoster()}
          onError={(e) => (e.target.src = placeholder)}
          alt={movie.title}
        />
        <div className="movie-detail-content">
          <div className="movie-detail-title">
            {movie.title} <span className="movie-detail-year">({movie.year})</span>
          </div>
          <div className="movie-detail-overview">{movie.overview}</div>
          {movie.trailer && (
            <div className="movie-detail-trailer">
              <h5>Trailer</h5>
              <a href={movie.trailer} target="_blank" rel="noopener noreferrer">
                Watch Trailer
              </a>
            </div>
          )}
          {people && people.cast && people.cast.length > 0 && (
            <div className="movie-detail-cast">
              <h5>Cast</h5>
              <ul>
                {people.cast.slice(0, 5).map((person, index) => (
                  <li key={index}>
                    {person.person.name} as {person.character}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button className="movie-detail-back-btn" onClick={() => window.history.back()}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
