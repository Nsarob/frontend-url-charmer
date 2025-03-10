import React, { useState } from 'react';
import { ArrowRight, Link, ExternalLink, Copy, Check } from 'lucide-react';

const HomePage = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setShortUrl('https://shrt.io/xY7z9Q');
      setLoading(false);
    }, 800);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <Link className="text-indigo-600" size={24} />
          <span className="text-xl font-bold text-gray-800">ShortLink</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/login" className="text-gray-600 hover:text-gray-800">Login</a>
          <a href="/signup" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">Sign Up</a>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Make Your Links Shorter</h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Create shortened URLs that are easy to share, track, and manage with our professional link shortening service.
        </p>
        
        {/* URL Shortener Form */}
        <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your long URL here..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Shortening...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Shorten <ArrowRight className="ml-2" size={18} />
                  </span>
                )}
              </button>
            </div>
          </form>
          
          {/* Results */}
          {shortUrl && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-sm text-gray-500">Your shortened URL:</span>
                  <div className="flex items-center mt-1">
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium flex items-center hover:underline">
                      {shortUrl}
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
                >
                  {copied ? (
                    <span className="flex items-center text-green-600">
                      <Check size={16} className="mr-2" />
                      Copied!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Copy size={16} className="mr-2" />
                      Copy
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Features Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose ShortLink?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Link className="text-indigo-600" size={20} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Short URLs</h3>
            <p className="text-gray-600">Create branded short links that reflect your brand and boost recognition.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-indigo-600" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20v-6M9 20v-4M6 20v-2M15 20v-2M18 20v-4M12 4v4M18 9V4M6 9V4M9 10v2M15 10v2M9 4h6M18 4h2M4 4h2M4 9h16"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
            <p className="text-gray-600">Track clicks, locations, devices, and referrers with our powerful analytics.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-indigo-600" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Links</h3>
            <p className="text-gray-600">All links are secured with HTTPS and protected from spam and malicious activity.</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Link className="text-white" size={20} />
              <span className="text-lg font-semibold">ShortLink</span>
            </div>
            <p className="text-gray-400">The professional URL shortener for businesses and individuals.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-8 border-t border-gray-700 text-gray-400 text-sm">
          <p>© 2025 ShortLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;