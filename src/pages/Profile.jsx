import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useMovies } from "../context/MovieContext";
import { db, storage } from "../config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button, Form, ListGroup, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Profile() {
  const { user } = useAuth();
  const { savedMovies } = useMovies();
  const [displayName, setDisplayName] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);
  const [message, setMessage] = useState("");
  const [profileLink, setProfileLink] = useState("");
  
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setDisplayName(data.displayName || "");
          setNewDisplayName(data.displayName || "");
          setAvatarUrl(data.avatarUrl || "");
        }
      };
      fetchProfile();
      // Create a shareable profile link
      setProfileLink(`${window.location.origin}/profile/${user.uid}`);
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setNewAvatar(e.target.files[0]);
    }
  };

  const uploadAvatar = async () => {
    if (!newAvatar || !user) return;
    try {
      const avatarRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(avatarRef, newAvatar);
      const downloadURL = await getDownloadURL(avatarRef);
      // Use setDoc with merge to create or update the profile document
      await setDoc(doc(db, "users", user.uid), { avatarUrl: downloadURL }, { merge: true });
      setAvatarUrl(downloadURL);
      setMessage("Avatar updated successfully!");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setMessage("Failed to update avatar.");
    }
  };

  const updateDisplayName = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      // Use setDoc with merge so the document is created if missing
      await setDoc(doc(db, "users", user.uid), { displayName: newDisplayName }, { merge: true });
      setDisplayName(newDisplayName);
      setMessage("Display name updated successfully!");
    } catch (error) {
      console.error("Error updating display name:", error);
      setMessage("Failed to update display name.");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Profile</h1>
      
      {user && (
        <div className="mb-3">
          <p>Share your profile:</p>
          <input type="text" value={profileLink} readOnly className="form-control" />
        </div>
      )}

      <div className="text-center">
        <Image
          src={avatarUrl || "https://placehold.co/600x400"}
          alt="User Avatar"
          roundedCircle
          width="150"
        />
      </div>

      {/* Update Display Name Form */}
      <Form onSubmit={updateDisplayName} className="mt-3">
        <Form.Group controlId="displayName">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
            placeholder="Enter your display name"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Update Display Name
        </Button>
      </Form>

      {/* Avatar Upload Form */}
      <Form className="mt-3">
        <Form.Group>
          <Form.Label>Change Avatar</Form.Label>
          <Form.Control type="file" onChange={handleAvatarChange} />
        </Form.Group>
        <Button variant="primary" onClick={uploadAvatar} className="mt-2">
          Upload Avatar
        </Button>
      </Form>

      {message && <p className="mt-2">{message}</p>}

      {/* Saved Movies */}
      <h2 className="mt-4">Your Saved Movies</h2>
      {savedMovies.length === 0 ? (
        <p>No saved movies yet.</p>
      ) : (
        <ListGroup>
          {savedMovies.map((movie) => (
            <ListGroup.Item key={movie.traktId}>
              {movie.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default Profile;
