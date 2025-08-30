import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Button, ListGroup } from "react-bootstrap";

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
      const url = movie.images.banner[0];
      return url.startsWith("http") ? url : `https://${url}`;
    }
    return placeholder;
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Img
          variant="top"
          src={getPoster()}
          onError={(e) => (e.target.src = placeholder)}
          alt={movie.title}
        />
        <Card.Body>
          <Card.Title>{movie.title} ({movie.year})</Card.Title>
          <Card.Text>{movie.overview}</Card.Text>
          {movie.trailer && (
            <div className="mb-3">
              <h5>Trailer</h5>
              <a href={movie.trailer} target="_blank" rel="noopener noreferrer">
                Watch Trailer
              </a>
            </div>
          )}
          {people && people.cast && people.cast.length > 0 && (
            <>
              <h5>Cast</h5>
              <ListGroup variant="flush">
                {people.cast.slice(0, 5).map((person, index) => (
                  <ListGroup.Item key={index}>
                    {person.person.name} as {person.character}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
          <Button variant="primary" className="mt-3" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MovieDetail;
