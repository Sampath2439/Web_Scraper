
import React from 'react';
import { SettingsIcon } from './Icons';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onOpenSettings: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings, theme, onToggleTheme }) => {
  return (
    <header className="w-full p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex-1"></div> {/* Spacer */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight text-center flex-1">
          Shiva Scraper
        </h1>
        <div className="flex-1 flex justify-end items-center space-x-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
            aria-label="API Key Settings"
          >
            <SettingsIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};