// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Eye, BarChart4, Plus, LogOut } from 'lucide-react';
import api from '../api';
import LinkDetailsModal from '../components/LinkDetailsModal';
import MetricCard from '../components/MetricCard';
import LinkTable from '../components/LinkTable';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedLink, setSelectedLink] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await api.get('urls');
        const data = response.data.data;
        setLinks(data);
      } catch (error) {
        console.error('Error fetching links:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLinks();
  }, []);
  
  const handleCreateLink = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    
    try {
      const response = await api.post('shorten', { url: url, short_code: customAlias });
      const data = response.data.data;
      setLinks([data, ...links]);
      setUrl('');
      setCustomAlias('');
    } catch (error) {
      console.error('Error creating link:', error);
    } finally {
      setIsCreating(false);
    }
  };
  
  const handleCopy = (short, id) => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_BACKEND_URL}l/${short}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredLinks = links.filter(link => 
    link.long_url.toLowerCase().includes(search.toLowerCase()) || 
    link.short_code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden md:block">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-indigo-600" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <span className="text-lg font-bold text-gray-800">ShortLink</span>
          </div>
        </div>
        <div className="p-4">
          <nav className="space-y-1">
            <a href="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-indigo-50 text-indigo-700">
              <BarChart4 className="mr-3 h-5 w-5" />
              Dashboard
            </a>
          </nav>
        </div>
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <a href="/" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <LogOut className="mr-3 h-5 w-5" />
            Sign out
          </a>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <MetricCard
              title="Total Links"
              value={loading ? '-' : links.length}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              }
              trend={12}
              trendColor="text-green-600"
            />
            
            <MetricCard
              title="Total Clicks"
              value={loading ? '-' : links.reduce((sum, link) => sum + link.clicks, 0).toLocaleString()}
              icon={<Eye className="h-6 w-6 text-purple-600" />}
              trend={23}
              trendColor="text-green-600"
            />
            
            <MetricCard
              title="Average CTR"
              value="4.6%"
              icon={<BarChart4 className="h-6 w-6 text-blue-600" />}
              trend={-2}
              trendColor="text-red-600"
            />
          </div>
          
          {/* Create New Link */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Create New Link</h2>
              <form onSubmit={handleCreateLink}>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <div className="md:col-span-3">
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                      Original URL
                    </label>
                    <input
                      type="url"
                      id="url"
                      placeholder="https://example.com/your-long-url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="custom-alias" className="block text-sm font-medium text-gray-700 mb-1">
                      Custom Alias (Optional)
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        shrt.io/
                      </span>
                      <input
                        type="text"
                        id="custom-alias"
                        placeholder="my-custom-link"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-1 flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition flex items-center justify-center"
                      disabled={isCreating}
                    >
                      {isCreating ? (
                        <span className="flex items-center">
                          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Plus size={18} className="mr-1" />
                          Create
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Links Table */}
          <div className="bg-white rounded-lg shadow">
            <LinkTable
              links={filteredLinks}
              loading={loading}
              search={search}
              onSearch={setSearch}
              onCopy={handleCopy}
              copiedId={copiedId}
              onViewStats={setSelectedLink}
            />
          </div>
        </div>
      </div>

      {/* Link Details Modal */}
      <LinkDetailsModal
        link={selectedLink}
        onClose={() => setSelectedLink(null)}
        onCopy={handleCopy}
        copiedId={copiedId}
      />
    </div>
  );
};

export default Dashboard;