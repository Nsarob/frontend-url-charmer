// components/LinkDetailsModal.jsx
import React from 'react';
import { ExternalLink, Copy, Check, BarChart4, X } from 'lucide-react';

const LinkDetailsModal = ({ link, onClose, onCopy, copiedId }) => {
  if (!link) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold text-gray-800">Link Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Original URL</h3>
              <a
                href={link.long_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {link.long_url}
              </a>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Short URL</h3>
              <div className="flex items-center">
                <a
                  href={`${import.meta.env.VITE_BACKEND_URL}l/${link.short_code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mr-2"
                >
                  {import.meta.env.VITE_BACKEND_URL}l/{link.short_code}
                </a>
                <button
                  onClick={() => onCopy(link.short_code, link.id)}
                  className="p-1 rounded hover:bg-gray-100"
                  title="Copy link"
                >
                  {copiedId === link.id ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Clicks</h3>
                <p className="text-lg font-semibold">{link.clicks.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Created</h3>
                <p className="text-gray-700">
                  {new Date(link.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Share this link</h3>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200">
                  Twitter
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Facebook
                </button>
                <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkDetailsModal;