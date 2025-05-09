import React, { useState } from 'react';
import { Type } from 'lucide-react';
import Button from '../ui/Button';
import { extractContentFromText } from '../../utils/contentExtraction';

interface TextImporterProps {
  onImport: (title: string, content: string, source: string) => void;
  isImporting: boolean;
}

const TextImporter: React.FC<TextImporterProps> = ({ onImport, isImporting }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }
    
    try {
      const { title, content } = extractContentFromText(text);
      onImport(title, content, 'Manual Input');
    } catch (err) {
      setError('Failed to process the entered text');
      console.error(err);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Paste or type text
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="Paste or type the content you want to read here..."
          disabled={isImporting}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          leftIcon={<Type size={16} />}
          isLoading={isImporting}
        >
          Import Text
        </Button>
      </div>
    </form>
  );
};

export default TextImporter;