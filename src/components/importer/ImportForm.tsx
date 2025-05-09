import React, { useState } from 'react';
import { Link2, FileText, Type } from 'lucide-react';
import Button from '../ui/Button';
import UrlImporter from './UrlImporter';
import FileImporter from './FileImporter';
import TextImporter from './TextImporter';
import { ImportSource } from '../../types';

interface ImportFormProps {
  onImportComplete: (title: string, content: string, source: string) => void;
  isImporting: boolean;
}

const ImportForm: React.FC<ImportFormProps> = ({ onImportComplete, isImporting }) => {
  const [activeTab, setActiveTab] = useState<ImportSource>('url');
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 max-w-2xl mx-auto transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Import Content</h2>
      
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${
            activeTab === 'url'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('url')}
        >
          <Link2 size={16} className="mr-2" />
          URL
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${
            activeTab === 'file'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('file')}
        >
          <FileText size={16} className="mr-2" />
          File
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${
            activeTab === 'text'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('text')}
        >
          <Type size={16} className="mr-2" />
          Text
        </button>
      </div>
      
      <div className="py-2">
        {activeTab === 'url' && (
          <UrlImporter onImport={onImportComplete} isImporting={isImporting} />
        )}
        
        {activeTab === 'file' && (
          <FileImporter onImport={onImportComplete} isImporting={isImporting} />
        )}
        
        {activeTab === 'text' && (
          <TextImporter onImport={onImportComplete} isImporting={isImporting} />
        )}
      </div>
    </div>
  );
};

export default ImportForm;