import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebaseConfig";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";

function PublicProfile() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        setUserInfo(userDoc.data());
      }

      const q = query(collection(db, "movies"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const moviesData = querySnapshot.docs.map((doc) => doc.data());
      setMovies(moviesData);
    };

    fetchProfile();
  }, [userId]);

  return (
    <div className="container mt-4">
      {userInfo && (
        <>
          <div className="text-center">
            <img
              src={userInfo.avatarUrl || "https://via.placeholder.com/150"}
              alt="User Avatar"
              className="rounded-circle"
              width="150"
            />
          </div>
          <h2 className="text-center">{userInfo.displayName}'s Profile</h2>
        </>
      )}

      <h3>Saved Movies</h3>
      <ul className="list-group">
        {movies.map((movie) => (
          <li key={movie.id} className="list-group-item">{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PublicProfile;
