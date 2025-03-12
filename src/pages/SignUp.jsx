import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signUp(email, password);
      const user = userCredential.user;

      // Save user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName,
        avatarUrl: "", // Default empty avatar
        email,
      });

      console.log("User signed up:", user);
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="displayName">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" className="mt-3">Sign Up</Button>
      </Form>
    </div>
  );
}

export default SignUp;
