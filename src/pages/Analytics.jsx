// src/pages/Analytics.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api";

export default function Analytics() {
  const { shortUrl } = useParams();
  const { data: analytics, isLoading } = useQuery(["analytics", shortUrl], () =>
    api.get(`/analytics/${shortUrl}`).then((res) => res.data)
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Analytics for {shortUrl}</h1>
      <div>
        <p>Total Clicks: {analytics?.clicks}</p>
        <p>Referrers: {analytics?.referrers?.join(", ")}</p>
      </div>
    </div>
  );
}