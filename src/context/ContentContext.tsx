import React, { createContext, useContext, useEffect, useState } from 'react';
import { Article, AudioSettings } from '../types';

interface ContentContextType {
  articles: Article[];
  currentArticleId: string | null;
  audioSettings: AudioSettings;
  addArticle: (article: Article) => void;
  updateArticle: (articleId: string, updates: Partial<Article>) => void;
  deleteArticle: (articleId: string) => void;
  setCurrentArticleId: (id: string | null) => void;
  updateAudioSettings: (settings: Partial<AudioSettings>) => void;
}

const defaultAudioSettings: AudioSettings = {
  enabled: true,
  volume: 0.5,
  soundType: 'mechanical',
};

const ContentContext = createContext<ContentContextType>({
  articles: [],
  currentArticleId: null,
  audioSettings: defaultAudioSettings,
  addArticle: () => {},
  updateArticle: () => {},
  deleteArticle: () => {},
  setCurrentArticleId: () => {},
  updateAudioSettings: () => {},
});

export const useContent = () => useContext(ContentContext);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>(() => {
    const savedArticles = localStorage.getItem('articles');
    return savedArticles ? JSON.parse(savedArticles) : [];
  });
  
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(null);
  
  const [audioSettings, setAudioSettings] = useState<AudioSettings>(() => {
    const savedSettings = localStorage.getItem('audioSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultAudioSettings;
  });

  useEffect(() => {
    localStorage.setItem('articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('audioSettings', JSON.stringify(audioSettings));
  }, [audioSettings]);

  const addArticle = (article: Article) => {
    setArticles(prev => [...prev, article]);
  };

  const updateArticle = (articleId: string, updates: Partial<Article>) => {
    setArticles(prev => 
      prev.map(article => 
        article.id === articleId ? { ...article, ...updates } : article
      )
    );
  };

  const deleteArticle = (articleId: string) => {
    setArticles(prev => prev.filter(article => article.id !== articleId));
  };

  const updateAudioSettings = (settings: Partial<AudioSettings>) => {
    setAudioSettings(prev => ({ ...prev, ...settings }));
  };

  return (
    <ContentContext.Provider 
      value={{ 
        articles, 
        currentArticleId, 
        audioSettings,
        addArticle, 
        updateArticle, 
        deleteArticle, 
        setCurrentArticleId,
        updateAudioSettings,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};