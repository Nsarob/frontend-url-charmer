// src/App.jsx
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// import HomePage from "./pages/NewLandingpage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ShortenUrl from "./pages/ShortenUrl";
import Analytics from "./pages/Analytics";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/shorten"
          element={
            <PrivateRoute>
              <ShortenUrl />
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics/:shortUrl"
          element={
            <PrivateRoute>
              <Analytics />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;