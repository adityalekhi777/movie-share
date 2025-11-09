import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styles from './LoginSignUp.module.css';
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError('Failed to log in');
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
        <h1 className={styles.title}>Login</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
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
            Login
          </button>
        </form>
        <div className={styles.divider}>or</div>
        <button onClick={handleGoogleSignIn} className={styles.googleButton}>
          <img src="/googleIcon.svg" alt="Google icon" className={styles.googleIcon} />
          Sign in with Google
        </button>
        <div className={styles.text}>
          Don't have an account? <Link to="/signup" className={styles.link}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
