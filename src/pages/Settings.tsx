import React from 'react';
import { useContent } from '../context/ContentContext';
import AudioSettings from '../components/reader/AudioSettings';

const Settings: React.FC = () => {
  const { audioSettings, updateAudioSettings } = useContent();
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Settings</h2>
      
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden transition-colors duration-300">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Audio Preferences</h3>
          </div>
          <div className="px-6 py-4">
            <AudioSettings
              settings={audioSettings}
              onUpdateSettings={updateAudioSettings}
            />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden transition-colors duration-300">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">About ReadType</h3>
          </div>
          <div className="px-6 py-4 prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300">
              ReadType helps you internalize content by typing it out, combining the "read-later" functionality of tools like Readwise or Matter with the active engagement of typing.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Features:
            </p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>Import content from web articles, files, and manual input</li>
              <li>Type to reveal content as you read</li>
              <li>Highlight and save important passages</li>
              <li>Track reading metrics including speed and accuracy</li>
              <li>Customize audio feedback with different typing sounds</li>
              <li>Organize your reading in a personal library</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              <strong>Keyboard Shortcuts:</strong>
            </p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Alt</kbd> - Pause/resume reading</li>
              <li><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Backspace</kbd> - Delete previous character</li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
          ReadType v1.0.0 • Built with React & Tailwind CSS
        </div>
      </div>
    </div>
  );
};

export default Settings;