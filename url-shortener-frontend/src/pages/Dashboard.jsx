// src/pages/Dashboard.jsx
import { useState } from "react"; // Add this import
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../api";

export default function Dashboard() {
  const [url, setUrl] = useState(""); // Now useState is defined
  const [error, setError] = useState("");

  // Fetch user-specific URLs
  const {
    data: urls,
    isLoading: isFetchingUrls,
    refetch,
  } = useQuery({
    queryKey: ["urls"],
    queryFn: () => api.get("/api/urls").then((res) => res.data),
  });

  // Shorten URL mutation
  const { mutate: shortenUrl, isLoading: isShortening } = useMutation({
    mutationFn: (longUrl) => api.post("/api/urls/shorten", { longUrl }),
    onSuccess: () => {
      setUrl("");
      refetch();
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Failed to shorten URL");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    shortenUrl(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a long URL"
          className="w-full p-2 border rounded-lg"
          required
        />
        <button
          type="submit"
          disabled={isShortening}
          className="mt-2 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          {isShortening ? "Shortening..." : "Shorten URL"}
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Shortened URLs</h2>
        {isFetchingUrls ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {urls?.map((url) => (
              <li key={url.short_code} className="mb-2">
                <a
                  href={`/${url.short_code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {url.short_code}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}