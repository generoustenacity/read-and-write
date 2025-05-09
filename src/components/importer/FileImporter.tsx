import React, { useState, useRef } from 'react';
import { FileText, Upload } from 'lucide-react';
import Button from '../ui/Button';
import { processFileContent } from '../../utils/contentExtraction';

interface FileImporterProps {
  onImport: (title: string, content: string, source: string) => void;
  isImporting: boolean;
}

const FileImporter: React.FC<FileImporterProps> = ({ onImport, isImporting }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) {
      setFile(null);
      return;
    }
    
    // Check file type (in a real app, we'd also check size)
    const validTypes = ['text/plain', 'application/pdf', 'application/epub+zip'];
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.txt')) {
      setError('Please select a valid file type (TXT, PDF, EPUB)');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }
    
    setFile(selectedFile);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!file) {
      setError('Please select a file');
      return;
    }
    
    try {
      const { title, content } = await processFileContent(file);
      onImport(title, content, `File: ${file.name}`);
    } catch (err) {
      setError('Failed to read the selected file');
      console.error(err);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 flex flex-col items-center justify-center">
        <FileText size={40} className="text-gray-400 dark:text-gray-500 mb-2" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 text-center">
          {file ? file.name : 'Drag and drop your file here, or click to browse'}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          id="file-upload"
          className="hidden"
          accept=".txt,.pdf,.epub"
          onChange={handleFileChange}
          disabled={isImporting}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          leftIcon={<Upload size={16} />}
          onClick={() => fileInputRef.current?.click()}
          disabled={isImporting}
        >
          Select File
        </Button>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      
      <div className="flex justify-end">
        <Button
          type="submit"
          leftIcon={<FileText size={16} />}
          isLoading={isImporting}
          disabled={!file || isImporting}
        >
          Import File
        </Button>
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        <p>Supported file types: TXT, PDF, EPUB</p>
        <p className="mt-1">Note: For this demo, only text files are fully supported. In a real application, PDF and EPUB parsing would be implemented.</p>
      </div>
    </form>
  );
};

export default FileImporter;