import { useMovies } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

function Profile() {
  const { savedMovies } = useMovies();
  const { user } = useAuth();
  // const location = useLocation();
  const [profileLink, setProfileLink] = useState("");

  useEffect(() => {
    if (user) {
      setProfileLink(`${window.location.origin}/profile/${user.uid}`);
    }
  }, [user]);

  return (
    <div className="container mt-4">
      <h1>{user ? "Your" : "User"} Profile</h1>
      
      {user && (
        <div className="mb-3">
          <p>Share your profile:</p>
          <input type="text" value={profileLink} readOnly className="form-control" />
        </div>
      )}

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
