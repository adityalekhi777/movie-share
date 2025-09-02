import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NavbarComponent from "./components/NavbarComponent";
import Search from "./pages/Search";
import PublicProfile from "./pages/PublicProfile";
import MovieDetail from "./pages/MovieDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import { useTheme } from "./context/ThemeContext";
import './App.css';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <NavbarComponent />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }/>
          <Route path="/profile/:userId" element={<PublicProfile />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
