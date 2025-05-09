import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TypingInterface from '../components/reader/TypingInterface';
import { HighlightSidebar } from '../components/reader/HighlightSidebar';
import HighlightManager from '../components/reader/HighlightManager';
import { useContent } from '../context/ContentContext';
import Button from '../components/ui/Button';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const Reader: React.FC = () => {
  const { articles, currentArticleId, updateArticle, audioSettings } = useContent();
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Find the current article
  const currentArticle = articles.find(article => article.id === currentArticleId);
  
  // Redirect to home if no article is selected
  useEffect(() => {
    if (!currentArticleId || !currentArticle) {
      navigate('/');
    }
  }, [currentArticleId, currentArticle, navigate]);
  
  if (!currentArticle) {
    return null;
  }
  
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
    updateArticle(currentArticle.id, {
      highlights
    });
  };
  
  const handleDeleteHighlight = (id: string) => {
    const updatedHighlights = currentArticle.highlights.filter(
      highlight => highlight.id !== id
    );
    
    updateArticle(currentArticle.id, {
      highlights: updatedHighlights
    });
  };
  
  const handleGoToLibrary = () => {
    navigate('/library');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => navigate('/')}
        >
          Back
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          Highlights
        </Button>
        
        {isComplete && (
          <div className="ml-auto flex items-center text-green-600 dark:text-green-400">
            <CheckCircle size={18} className="mr-1" />
            <span>Reading complete!</span>
            <Button
              variant="outline"
              size="sm"
              className="ml-4"
              onClick={handleGoToLibrary}
            >
              Go to Library
            </Button>
          </div>
        )}
      </div>
      
      <TypingInterface
        article={currentArticle}
        onComplete={handleComplete}
        onUpdateHighlights={handleUpdateHighlights}
        audioEnabled={audioSettings.enabled}
        audioType={audioSettings.soundType}
      />
      
      <HighlightSidebar
        highlights={currentArticle.highlights}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onDeleteHighlight={handleDeleteHighlight}
      />
    </div>
  );
};

export default Reader;