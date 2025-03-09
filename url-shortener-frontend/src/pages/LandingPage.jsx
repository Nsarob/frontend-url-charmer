// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <header className="w-full bg-white shadow-sm">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">URL Charmer</h1>
          <div className="flex space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">
              Register
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Shorten Your Links
        </h2>
        <p className="text-gray-600 mb-8">
          A simple and fast URL shortener to make your links more manageable.
        </p>
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Get Started
        </Link>
      </main>

      <footer className="w-full bg-white shadow-sm mt-auto">
        <div className="container mx-auto p-4 text-center text-gray-600">
          &copy; 2023 URL Charmer. All rights reserved.
        </div>
      </footer>
    </div>
  );
}