export interface Article {
  id: string;
  title: string;
  content: string;
  source: string;
  dateAdded: string;
  lastOpened?: string;
  completed: boolean;
  progress: number;
  highlights: Highlight[];
  statistics: ArticleStatistics;
}

export interface Highlight {
  id: string;
  text: string;
  position: number;
  dateCreated: string;
}

export interface ArticleStatistics {
  wordsTyped: number;
  totalWords: number;
  timeSpent: number; // in seconds
  wpm: number;
  accuracy: number;
  errorCount: number;
}

export interface TypingState {
  currentPosition: number;
  mistakes: number[];
  startTime: number | null;
  endTime: number | null;
  isPaused: boolean;
  pauseStartTime: number | null;
  totalPausedTime: number;
  highlights: Highlight[];
}

export interface AudioSettings {
  enabled: boolean;
  volume: number;
  soundType: 'typewriter' | 'mechanical' | 'soft' | 'none';
}

export type ImportSource = 'url' | 'file' | 'text';

export interface ThemeState {
  darkMode: boolean;
}