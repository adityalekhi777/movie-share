import { useMovies } from "../context/MovieContext";

function Profile() {
  const { savedMovies } = useMovies();

  return (
    <div className="container mt-4">
      <h1>Your Saved Movies</h1>
      {savedMovies.length === 0 ? (
        <p>No saved movies yet.</p>
      ) : (
        <ul className="list-group">
          {savedMovies.map((movie) => (
            <li key={movie.id} className="list-group-item">
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Profile;