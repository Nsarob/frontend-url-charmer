// src/pages/ShortenUrl.jsx
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../api";

export default function ShortenUrl() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const { mutate: shortenUrl, isLoading } = useMutation(
    (longUrl) => api.post("/urls/shorten", { longUrl }),
    {
      onSuccess: (res) => {
        setShortUrl(res.data.shortUrl);
        setError("");
      },
      onError: (err) => {
        console.log("Error while shortnening: ", err);
        setError(err.response?.data?.message || "Failed to shorten URL");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    shortenUrl(longUrl);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Shorten URL</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter a long URL"
          className="w-full p-2 border rounded-lg"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          {isLoading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {shortUrl && (
        <div>
          <p className="text-green-600">Shortened URL:</p>
          <a
            href={`/${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}