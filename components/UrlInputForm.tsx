
import React from 'react';
import { ScrapeIcon } from './Icons';

interface UrlInputFormProps {
  url: string;
  setUrl: (url: string) => void;
  description: string;
  setDescription: (description: string) => void;
  onScrape: () => void;
  disabled: boolean;
}

export const UrlInputForm: React.FC<UrlInputFormProps> = ({
  url,
  setUrl,
  description,
  setDescription,
  onScrape,
  disabled,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScrape();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Website URL
        </label>
        <input
          id="url-input"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-gray-400"
        />
      </div>
      <div>
        <label htmlFor="description-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Data to Extract
        </label>
        <textarea
          id="description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., all job titles and their locations"
          required
          rows={3}
          className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200 resize-none dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-gray-400"
        />
      </div>
      <button
        type="submit"
        disabled={disabled}
        className="w-full flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 dark:disabled:bg-gray-500"
      >
        <ScrapeIcon className="w-5 h-5 mr-2" />
        {disabled ? 'Processing...' : 'Start Scraping'}
      </button>
    </form>
  );
};