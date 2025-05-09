import React, { useState } from 'react';
import { Link2 } from 'lucide-react';
import Button from '../ui/Button';
import { extractMetadataFromUrl } from '../../utils/contentExtraction';

interface UrlImporterProps {
  onImport: (title: string, content: string, source: string) => void;
  isImporting: boolean;
}

const UrlImporter: React.FC<UrlImporterProps> = ({ onImport, isImporting }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }
    
    // Basic URL validation
    try {
      new URL(url); // Will throw if URL is invalid
    } catch (e) {
      setError('Please enter a valid URL');
      return;
    }
    
    try {
      const { title, content } = await extractMetadataFromUrl(url);
      onImport(title, content, url);
    } catch (err) {
      setError('Failed to extract content from the provided URL');
      console.error(err);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Article URL
        </label>
        <input
          type="text"
          id="url"
          placeholder="https://example.com/article"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          disabled={isImporting}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          leftIcon={<Link2 size={16} />}
          isLoading={isImporting}
        >
          Import from URL
        </Button>
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        <p>ReadType will extract the main content from the provided URL.</p>
        <p className="mt-1">Note: For this demo, we simulate content extraction. In a real application, URL content would be extracted server-side.</p>
      </div>
    </form>
  );
};

export default UrlImporter;