import React, { useState } from "react";
import { useMovies } from "../context/MovieContext";
import { Link } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";

const Home = () => {
  const { popularMovies, addMovie } = useMovies();
  const placeholder = "https://placehold.co/600x400";
  const [saveMessage, setSaveMessage] = useState("");

  // Helper: try clearart first, then poster
  const getImageUrl = (images) => {
    if (images) {
      if (images.clearart && images.clearart.length > 0) {
        const url = images.poster[0];
        return url.startsWith("http") ? url : `https://${url}`;
      }
      if (images.poster && images.poster.length > 0) {
        const url = images.poster[0];
        return url.startsWith("http") ? url : `https://${url}`;
      }
    }
    return placeholder;
  };

  const handleSave = async (movie) => {
    try {
      // Save the movie along with its poster URL using the helper
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
    <div className="container mt-4">
      <h2>Popular Movies</h2>
      {saveMessage && <Alert variant="success">{saveMessage}</Alert>}
      <div className="row">
        {popularMovies.map((movie) => (
          <div key={movie.ids.trakt} className="col-md-3 mb-4">
            <Card>
              {/* Use movie.ids.slug for navigation */}
              <Link to={`/movie/${movie.ids.slug}`}>
                <Card.Img
                  variant="top"
                  src={getImageUrl(movie.images)}
                  onError={(e) => (e.target.src = placeholder)}
                  alt={movie.title}
                />
              </Link>
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <div className="d-flex justify-content-between">
                  <Button variant="outline-light" onClick={() => handleSave(movie)}>
                    Save
                  </Button>
                  <Link to={`/movie/${movie.ids.slug}`}>
                    <Button variant="outline-light">View Details</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
