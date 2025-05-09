import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Book, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleDarkMode } = useTheme();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-cream-50 dark:bg-primary-950 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="font-bold text-lg text-accent-600 dark:text-accent-500 flex items-center gap-2">
              <Book size={24} />
              <span>ReadType</span>
            </span>
          </div>
          
          <nav className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/')}
              className={`p-2 rounded-md flex items-center transition-colors ${
                location.pathname === '/' 
                  ? 'text-accent-600 dark:text-accent-500' 
                  : 'text-primary-800 dark:text-cream-300 hover:text-accent-600 dark:hover:text-accent-500'
              }`}
            >
              <Home size={20} />
              <span className="ml-1 text-sm hidden sm:inline">Home</span>
            </button>
            
            <button 
              onClick={() => navigate('/library')}
              className={`p-2 rounded-md flex items-center transition-colors ${
                location.pathname === '/library' 
                  ? 'text-accent-600 dark:text-accent-500' 
                  : 'text-primary-800 dark:text-cream-300 hover:text-accent-600 dark:hover:text-accent-500'
              }`}
            >
              <Book size={20} />
              <span className="ml-1 text-sm hidden sm:inline">Library</span>
            </button>
            
            <button 
              onClick={() => navigate('/settings')}
              className={`p-2 rounded-md flex items-center transition-colors ${
                location.pathname === '/settings' 
                  ? 'text-accent-600 dark:text-accent-500' 
                  : 'text-primary-800 dark:text-cream-300 hover:text-accent-600 dark:hover:text-accent-500'
              }`}
            >
              <Settings size={20} />
              <span className="ml-1 text-sm hidden sm:inline">Settings</span>
            </button>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-primary-800 dark:text-cream-300 hover:text-accent-600 dark:hover:text-accent-500 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme.darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;