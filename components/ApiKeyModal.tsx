
import React, { useState, useEffect } from 'react';
import { KeyIcon } from './Icons';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
  currentApiKey: string;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave, currentApiKey }) => {
  const [apiKey, setApiKey] = useState(currentApiKey);

  useEffect(() => {
    setApiKey(currentApiKey);
  }, [currentApiKey, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave(apiKey);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
        role="dialog"
        aria-modal="true"
        aria-labelledby="api-key-modal-title"
      >
        <div className="flex items-center mb-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-4">
            <KeyIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </div>
          <h2 id="api-key-modal-title" className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Gemini API Key
          </h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Your API key is stored securely in your browser's local storage and is never sent to our servers.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <label htmlFor="api-key-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter your key
          </label>
          <input
            id="api-key-input"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API Key"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-gray-400"
            autoFocus
          />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            You can get a key from Google AI Studio.
          </p>

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition duration-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!apiKey}
              className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 dark:disabled:bg-gray-500"
            >
              Save Key
            </button>
          </div>
        </form>
      </div>
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};