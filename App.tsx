
import React, { useState, useCallback, useEffect } from 'react';
import { UrlInputForm } from './components/UrlInputForm';
import { PipelineAnimation } from './components/PipelineAnimation';
import { DownloadSection } from './components/DownloadSection';
import { scrapeWebsite } from './services/geminiService';
import type { ScrapingStatus } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ApiKeyModal } from './components/ApiKeyModal';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('all product names, prices, and descriptions');
  const [scrapingStatus, setScrapingStatus] = useState<ScrapingStatus>('idle');
  const [scrapedData, setScrapedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const storedApiKey = localStorage.getItem('gemini_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    } else {
      setIsApiKeyModalOpen(true);
    }

    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

   useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleSaveApiKey = (newApiKey: string) => {
    if (newApiKey) {
      setApiKey(newApiKey);
      localStorage.setItem('gemini_api_key', newApiKey);
      setIsApiKeyModalOpen(false);
    }
  };

  const handleScrape = useCallback(async () => {
    if (!apiKey) {
      setError('Please set your Gemini API Key in the settings before scraping.');
      setIsApiKeyModalOpen(true);
      return;
    }
    if (!url || !description) {
      setError('Please provide both a URL and a description of the data to extract.');
      return;
    }
    setError(null);
    setScrapedData(null);
    setScrapingStatus('fetching');

    try {
      // Simulate pipeline stages for better UX
      const statusUpdates: ScrapingStatus[] = ['analyzing', 'generating'];
      for (const status of statusUpdates) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setScrapingStatus(status);
      }

      const csvData = await scrapeWebsite(url, description, apiKey);
      setScrapedData(csvData);
      setScrapingStatus('done');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during scraping.');
      setScrapingStatus('idle');
    }
  }, [url, description, apiKey]);

  const handleReset = () => {
    setUrl('');
    setDescription('all product names, prices, and descriptions');
    setScrapingStatus('idle');
    setScrapedData(null);
    setError(null);
  };

  const isProcessing = scrapingStatus !== 'idle' && scrapingStatus !== 'done';

  return (
    <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 min-h-screen flex flex-col font-sans">
      <Header 
        onOpenSettings={() => setIsApiKeyModalOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
          {!isProcessing && !scrapedData && (
            <UrlInputForm
              url={url}
              setUrl={setUrl}
              description={description}
              setDescription={setDescription}
              onScrape={handleScrape}
              disabled={isProcessing}
            />
          )}

          {isProcessing && <PipelineAnimation status={scrapingStatus} />}

          {scrapingStatus === 'done' && scrapedData && (
            <DownloadSection csvData={scrapedData} onReset={handleReset} />
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-md text-center dark:bg-red-900/20 dark:text-red-300 dark:border-red-500/30">
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={handleSaveApiKey}
        currentApiKey={apiKey}
      />
    </div>
  );
};

export default App;