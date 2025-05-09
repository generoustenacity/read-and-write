
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PanelRightOpen, CheckCircle } from 'lucide-react';
import TypingInterface from '../components/reader/TypingInterface';
import { HighlightSidebar } from '../components/reader/HighlightSidebar';
import { useContent } from '../context/ContentContext';
import Button from '../components/ui/Button';

const Reader: React.FC = () => {
  const { articles, currentArticleId, updateArticle, audioSettings } = useContent();
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const currentArticle = articles.find(article => article.id === currentArticleId);
  
  useEffect(() => {
    if (!currentArticleId || !currentArticle) {
      navigate('/');
    }
  }, [currentArticleId, currentArticle, navigate]);
  
  if (!currentArticle) return null;
  
  const handleComplete = (stats: {
    wpm: number;
    accuracy: number;
    timeSpent: number;
    errorCount: number;
  }) => {
    updateArticle(currentArticle.id, {
      completed: true,
      progress: 100,
      statistics: {
        ...currentArticle.statistics,
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        timeSpent: stats.timeSpent,
        errorCount: stats.errorCount,
        wordsTyped: currentArticle.content.trim().split(/\s+/).length
      },
      lastOpened: new Date().toISOString()
    });
    setIsComplete(true);
  };
  
  const handleUpdateHighlights = (highlights: any[]) => {
    updateArticle(currentArticle.id, { highlights });
  };
  
  const handleDeleteHighlight = (id: string) => {
    const updatedHighlights = currentArticle.highlights.filter(h => h.id !== id);
    updateArticle(currentArticle.id, { highlights: updatedHighlights });
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="flex items-center px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => navigate('/')}
        >
          Back
        </Button>
        
        {isComplete && (
          <div className="ml-auto flex items-center text-green-600 dark:text-green-400">
            <CheckCircle size={18} className="mr-1" />
            <span>Reading complete!</span>
          </div>
        )}
        
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`ml-4 p-2 rounded-md transition-colors ${
            isSidebarOpen 
              ? 'bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-300' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          <PanelRightOpen size={20} />
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <TypingInterface
              article={currentArticle}
              onComplete={handleComplete}
              onUpdateHighlights={handleUpdateHighlights}
              audioEnabled={audioSettings.enabled}
              audioType={audioSettings.soundType}
            />
          </div>
        </main>

        <HighlightSidebar
          highlights={currentArticle.highlights}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onDeleteHighlight={handleDeleteHighlight}
        />
      </div>
    </div>
  );
};

export default Reader;
