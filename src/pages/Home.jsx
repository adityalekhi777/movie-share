import React from "react";
import { useMovies } from "../context/MovieContext";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const Home = () => {
  const { popularMovies } = useMovies();
  const placeholder = "https://placehold.co/600x400";

  // Helper: try clearart first, then poster
  const getImageUrl = (images) => {
    if (images) {
      if (images.clearart && images.clearart.length > 0) {
        const url = images.clearart[0];
        return url.startsWith("http") ? url : `https://${url}`;
      }
      if (images.poster && images.poster.length > 0) {
        const url = images.poster[0];
        return url.startsWith("http") ? url : `https://${url}`;
      }
    }
    return placeholder;
  };

  console.log(popularMovies)

  return (
    <div className="container mt-4">
      <h2>Popular Movies</h2>
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
                <Link to={`/movie/${movie.ids.slug}`}>
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

export default Home;
