import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styles from './LoginSignUp.module.css';
import { useTheme } from "../context/ThemeContext";

const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password, displayName);
      navigate("/");
    } catch (error) {
      console.error("Sign up error:", error);
      setError('Failed to create an account');
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In error:", error);
      setError('Failed to sign in with Google');
    }
  };

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Sign Up</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className={styles.input}
          />
          <input 
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
        <div className={styles.divider}>or</div>
        <button onClick={handleGoogleSignIn} className={styles.googleButton}>
          <img src="/googleIcon.svg" alt="Google icon" className={styles.googleIcon} />
          Sign up with Google
        </button>
        <div className={styles.text}>
          Already have an account? <Link to="/login" className={styles.link}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
