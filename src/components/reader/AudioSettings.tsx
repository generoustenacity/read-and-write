import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { AudioSettings as AudioSettingsType } from '../../types';

interface AudioSettingsProps {
  settings: AudioSettingsType;
  onUpdateSettings: (settings: Partial<AudioSettingsType>) => void;
}

const AudioSettings: React.FC<AudioSettingsProps> = ({ settings, onUpdateSettings }) => {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onUpdateSettings({ volume: value });
  };
  
  const handleToggleSound = () => {
    onUpdateSettings({ enabled: !settings.enabled });
  };
  
  const handleSoundTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateSettings({ 
      soundType: e.target.value as 'typewriter' | 'mechanical' | 'soft' | 'none' 
    });
  };
  
  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow transition-colors duration-300">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Audio Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Typing Sounds</span>
          <button 
            onClick={handleToggleSound}
            className={`p-2 rounded-md transition-colors ${
              settings.enabled 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
            }`}
          >
            {settings.enabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
        
        <div className={settings.enabled ? '' : 'opacity-50 pointer-events-none'}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sound Type
          </label>
          <select
            value={settings.soundType}
            onChange={handleSoundTypeChange}
            className="block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
            disabled={!settings.enabled}
          >
            <option value="typewriter">Typewriter</option>
            <option value="mechanical">Mechanical Keyboard</option>
            <option value="soft">Soft Clicks</option>
            <option value="none">No Sound</option>
          </select>
        </div>
        
        <div className={settings.enabled ? '' : 'opacity-50 pointer-events-none'}>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Volume
            </label>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round(settings.volume * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.volume}
            onChange={handleVolumeChange}
            className="w-full accent-blue-500 dark:accent-blue-400"
            disabled={!settings.enabled}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioSettings;