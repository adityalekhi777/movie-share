import { Card, Button } from "react-bootstrap";
import { useMovies } from "../context/MovieContext";

function MovieCard({ movie }) {
  const { addMovie } = useMovies();

  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Button variant="success" onClick={() => addMovie(movie)}>Save</Button>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
