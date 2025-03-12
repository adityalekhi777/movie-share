import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button, Form } from "react-bootstrap";

function Profile() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setDisplayName(userDoc.data().displayName);
          setAvatarUrl(userDoc.data().avatarUrl);
        }
      };
      fetchProfile();
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setNewAvatar(e.target.files[0]);
    }
  };

  const uploadAvatar = async () => {
    if (!newAvatar || !user) return;

    const avatarRef = ref(storage, `avatars/${user.uid}`);
    await uploadBytes(avatarRef, newAvatar);
    const downloadURL = await getDownloadURL(avatarRef);

    await updateDoc(doc(db, "users", user.uid), { avatarUrl: downloadURL });
    setAvatarUrl(downloadURL);
  };

  return (
    <div className="container mt-4">
      <h2>Profile</h2>

      <div className="text-center">
        <img
          src={avatarUrl || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="rounded-circle"
          width="150"
        />
      </div>

      <Form className="mt-3">
        <Form.Group>
          <Form.Label>Change Avatar</Form.Label>
          <Form.Control type="file" onChange={handleAvatarChange} />
        </Form.Group>
        <Button className="mt-2" onClick={uploadAvatar}>Upload</Button>
      </Form>

      <p className="mt-3"><strong>Display Name:</strong> {displayName}</p>
    </div>
  );
}

export default Profile;
