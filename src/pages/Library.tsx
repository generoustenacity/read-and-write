import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import Button from '../components/ui/Button';
import { Book, Clock, CheckCircle, Trash2, ExternalLink, Edit3 } from 'lucide-react';

const Library: React.FC = () => {
  const { articles, deleteArticle, setCurrentArticleId } = useContent();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'dateAdded' | 'title'>('dateAdded');
  const [filterBy, setFilterBy] = useState<'all' | 'completed' | 'inProgress'>('all');
  
  // Sort and filter articles
  const filteredArticles = articles.filter(article => {
    if (filterBy === 'all') return true;
    if (filterBy === 'completed') return article.completed;
    if (filterBy === 'inProgress') return !article.completed;
    return true;
  });
  
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'dateAdded') {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });
  
  const handleOpenArticle = (id: string) => {
    setCurrentArticleId(id);
    navigate('/reader');
  };
  
  const handleDeleteArticle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the article
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteArticle(id);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  if (articles.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="py-12 flex flex-col items-center">
          <Book size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Your library is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Import content from the home page to start reading</p>
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Library</h2>
        
        <div className="flex space-x-4">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as any)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-md px-3 py-1.5 text-sm"
          >
            <option value="all">All Articles</option>
            <option value="completed">Completed</option>
            <option value="inProgress">In Progress</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-md px-3 py-1.5 text-sm"
          >
            <option value="dateAdded">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {sortedArticles.map(article => (
          <div
            key={article.id}
            onClick={() => handleOpenArticle(article.id)}
            className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 hover:shadow-md cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 flex items-center">
                  {article.title}
                  {article.completed && (
                    <span className="ml-2 text-green-500 dark:text-green-400 flex items-center text-sm font-normal">
                      <CheckCircle size={14} className="mr-1" />
                      Completed
                    </span>
                  )}
                </h3>
                
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center flex-wrap">
                  <span className="mr-4 flex items-center">
                    <Clock size={14} className="mr-1" />
                    Added {formatDate(article.dateAdded)}
                  </span>
                  
                  {article.source && (
                    <span className="mr-4 flex items-center">
                      <ExternalLink size={14} className="mr-1" />
                      {article.source.startsWith('http') 
                        ? (new URL(article.source)).hostname 
                        : article.source}
                    </span>
                  )}
                  
                  <span className="flex items-center">
                    <Edit3 size={14} className="mr-1" />
                    {article.statistics.totalWords} words
                  </span>
                </div>
              </div>
              
              <div className="flex items-center ml-4">
                {!article.completed && (
                  <div className="w-24 mr-4">
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div 
                        className="h-2 bg-blue-500 rounded-full" 
                        style={{ width: `${article.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">
                      {article.progress}%
                    </div>
                  </div>
                )}
                
                <button
                  onClick={(e) => handleDeleteArticle(article.id, e)}
                  className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 p-1"
                  aria-label="Delete article"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            {article.statistics.wpm > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400 grid grid-cols-3 gap-2">
                <div>
                  <span className="font-medium">Speed:</span> {article.statistics.wpm} WPM
                </div>
                <div>
                  <span className="font-medium">Accuracy:</span> {article.statistics.accuracy}%
                </div>
                <div>
                  <span className="font-medium">Time:</span> {Math.floor(article.statistics.timeSpent / 60)}m {article.statistics.timeSpent % 60}s
                </div>
              </div>
            )}
            
            {article.highlights.length > 0 && (
              <div className="mt-3 pt-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">{article.highlights.length} highlight{article.highlights.length !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;