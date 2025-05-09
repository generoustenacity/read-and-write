import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImportForm from '../components/importer/ImportForm';
import { Article } from '../types';
import { useContent } from '../context/ContentContext';
import { ArrowRight, BookOpen, Text } from 'lucide-react';

const Home: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const { addArticle, setCurrentArticleId } = useContent();
  const navigate = useNavigate();
  
  const handleImportComplete = (title: string, content: string, source: string) => {
    setIsImporting(true);
    
    const newArticle: Article = {
      id: Date.now().toString(),
      title,
      content,
      source,
      dateAdded: new Date().toISOString(),
      completed: false,
      progress: 0,
      highlights: [],
      statistics: {
        wordsTyped: 0,
        totalWords: content.trim().split(/\s+/).length,
        timeSpent: 0,
        wpm: 0,
        accuracy: 0,
        errorCount: 0
      }
    };
    
    addArticle(newArticle);
    setCurrentArticleId(newArticle.id);
    
    setTimeout(() => {
      setIsImporting(false);
      navigate(`/reader`);
    }, 800);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-900 dark:text-cream-100 mb-4 flex items-center justify-center">
          <BookOpen className="mr-2 text-accent-600 dark:text-accent-500" />
          ReadType
        </h1>
        <p className="text-lg text-primary-800 dark:text-cream-200 max-w-xl mx-auto">
          Read and internalize content by typing it out. Import articles, books, and notes to actively absorb information through typing.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-cream-50 dark:bg-primary-950 rounded-lg shadow p-6 transition-colors duration-300">
          <div className="flex items-center text-accent-600 dark:text-accent-500 mb-4">
            <div className="p-2 bg-cream-100 dark:bg-primary-900 rounded-md">
              <Text size={24} />
            </div>
            <h3 className="text-lg font-semibold ml-3">Active Reading</h3>
          </div>
          <p className="text-primary-800 dark:text-cream-200 mb-4">
            Engage more deeply with content by typing it out. This approach enhances retention and understanding through active participation.
          </p>
          <ul className="space-y-2 text-primary-700 dark:text-cream-300">
            <li className="flex items-start">
              <ArrowRight size={16} className="text-accent-600 dark:text-accent-500 mt-1 mr-2 flex-shrink-0" />
              <span>Improved focus and concentration</span>
            </li>
            <li className="flex items-start">
              <ArrowRight size={16} className="text-accent-600 dark:text-accent-500 mt-1 mr-2 flex-shrink-0" />
              <span>Enhanced memory and recall</span>
            </li>
            <li className="flex items-start">
              <ArrowRight size={16} className="text-accent-600 dark:text-accent-500 mt-1 mr-2 flex-shrink-0" />
              <span>Better comprehension of complex ideas</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-cream-50 dark:bg-primary-950 rounded-lg shadow p-6 transition-colors duration-300">
          <div className="flex items-center text-accent-600 dark:text-accent-500 mb-4">
            <div className="p-2 bg-cream-100 dark:bg-primary-900 rounded-md">
              <BookOpen size={24} />
            </div>
            <h3 className="text-lg font-semibold ml-3">How It Works</h3>
          </div>
          <ol className="space-y-4 mb-4 text-primary-700 dark:text-cream-300">
            <li className="flex">
              <span className="bg-cream-100 dark:bg-primary-900 text-accent-600 dark:text-accent-500 rounded-full w-6 h-6 flex items-center justify-center font-medium mr-3 flex-shrink-0">1</span>
              <span>Import content from URLs, files, or paste text</span>
            </li>
            <li className="flex">
              <span className="bg-cream-100 dark:bg-primary-900 text-accent-600 dark:text-accent-500 rounded-full w-6 h-6 flex items-center justify-center font-medium mr-3 flex-shrink-0">2</span>
              <span>Type the content to reveal it as you read</span>
            </li>
            <li className="flex">
              <span className="bg-cream-100 dark:bg-primary-900 text-accent-600 dark:text-accent-500 rounded-full w-6 h-6 flex items-center justify-center font-medium mr-3 flex-shrink-0">3</span>
              <span>Highlight important passages as you go</span>
            </li>
            <li className="flex">
              <span className="bg-cream-100 dark:bg-primary-900 text-accent-600 dark:text-accent-500 rounded-full w-6 h-6 flex items-center justify-center font-medium mr-3 flex-shrink-0">4</span>
              <span>Review your highlights and performance stats</span>
            </li>
          </ol>
        </div>
      </div>
      
      <ImportForm onImportComplete={handleImportComplete} isImporting={isImporting} />
    </div>
  );
};

export default Home;