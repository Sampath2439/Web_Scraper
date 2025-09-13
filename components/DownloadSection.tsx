
import React from 'react';
import { DownloadIcon, RefreshIcon } from './Icons';

interface DownloadSectionProps {
  csvData: string;
  onReset: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ csvData, onReset }) => {
  
  const handleDownload = () => {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'scraped_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="text-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">Scraping Complete!</h2>
      <p className="text-gray-500 dark:text-gray-400">Review the scraped data below. You can download it as a CSV file.</p>
      
      <div className="w-full">
        <label htmlFor="scraped-data-output" className="sr-only">Scraped Data</label>
        <textarea
          id="scraped-data-output"
          readOnly
          value={csvData}
          className="w-full h-64 p-3 font-mono text-xs bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200 resize-y text-gray-800 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-gray-400"
          aria-label="Scraped data output"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200 dark:bg-green-500 dark:hover:bg-green-600"
          >
            <DownloadIcon className="w-5 h-5 mr-2" />
            Download CSV
          </button>
          <button
            onClick={onReset}
            className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-200 dark:bg-gray-500 dark:hover:bg-gray-600"
          >
            <RefreshIcon className="w-5 h-5 mr-2" />
            Scrape Another
          </button>
      </div>
    </div>
  );
};