import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import styles from './NavbarComponent.module.css';

function NavbarComponent() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`${styles.navbar} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>MovieShare</Link>
        <div className={styles.nav}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/search" className={styles.navLink}>Search</Link>
          {user && <Link to="/profile" className={styles.navLink}>Profile</Link>}
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
          </button>
          {user ? (
            <button onClick={logout} className={styles.button}>Logout</button>
          ) : (
            <>
              <Link to="/login" className={styles.navLink}>Login</Link>
              <Link to="/signup" className={styles.navLink}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
