import { useState, useEffect, useCallback, useRef } from 'react';
import { Highlight, TypingState } from '../types';
import { calculateWPM, calculateAccuracy } from '../utils/typingMetrics';

interface UseTypingTestProps {
  content: string;
  onComplete: (stats: {
    wpm: number;
    accuracy: number;
    timeSpent: number;
    errorCount: number;
  }) => void;
  initialState?: Partial<TypingState>;
  audioEnabled?: boolean;
  soundType?: string;
}

const useTypingTest = ({
  content,
  onComplete,
  initialState = {},
  audioEnabled = true,
  soundType = 'mechanical'
}: UseTypingTestProps) => {
  const [state, setState] = useState<TypingState>({
    currentPosition: 0,
    mistakes: [],
    startTime: null,
    endTime: null,
    isPaused: false,
    pauseStartTime: null,
    totalPausedTime: 0,
    highlights: [],
    ...initialState
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load audio based on sound type
  useEffect(() => {
    if (audioEnabled) {
      const audio = new Audio();
      
      switch (soundType) {
        case 'typewriter':
          audio.src = 'https://www.soundjay.com/mechanical/typewriter-key-1.mp3';
          break;
        case 'mechanical':
          audio.src = 'https://www.soundjay.com/mechanical/keyboard-typing-5.mp3';
          break;
        case 'soft':
          audio.src = 'https://www.soundjay.com/mechanical/keyboard-typing-1.mp3';
          break;
        default:
          // No sound
          break;
      }
      
      audio.volume = 0.3;
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, [audioEnabled, soundType]);

  const playTypeSound = useCallback(() => {
    if (audioEnabled && audioRef.current) {
      const audio = audioRef.current.cloneNode() as HTMLAudioElement;
      audio.play();
    }
  }, [audioEnabled]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (state.endTime) return; // Test already completed
    
    // Handle pause (Alt key by default)
    if (e.key === 'Alt') {
      e.preventDefault();
      setState(prev => {
        if (prev.isPaused) {
          // Resuming
          const additionalPausedTime = prev.pauseStartTime 
            ? Date.now() - prev.pauseStartTime 
            : 0;
            
          return {
            ...prev,
            isPaused: false,
            pauseStartTime: null,
            totalPausedTime: prev.totalPausedTime + additionalPausedTime
          };
        } else {
          // Pausing
          return {
            ...prev,
            isPaused: true,
            pauseStartTime: Date.now()
          };
        }
      });
      return;
    }
    
    if (state.isPaused) return; // Don't process typing while paused
    
    // Initialize test start time on first keystroke
    if (state.startTime === null) {
      setState(prev => ({
        ...prev,
        startTime: Date.now()
      }));
    }
    
    if (e.key === 'Backspace') {
      // Handle Backspace - allow user to correct mistakes
      setState(prev => {
        if (prev.currentPosition > 0) {
          return {
            ...prev,
            currentPosition: prev.currentPosition - 1,
            mistakes: prev.mistakes.filter(pos => pos !== prev.currentPosition - 1)
          };
        }
        return prev;
      });
      return;
    }
    
    // Process regular keystrokes
    if (e.key.length === 1) { // Only process printable characters
      setState(prev => {
        const expectedChar = content[prev.currentPosition];
        const isCorrect = e.key === expectedChar;
        
        // Play sound for correct keystrokes
        if (isCorrect) {
          playTypeSound();
        }
        
        // Update position and track mistakes
        const newPosition = prev.currentPosition + 1;
        const newMistakes = isCorrect 
          ? prev.mistakes 
          : [...prev.mistakes, prev.currentPosition];
        
        // Check if test is complete
        const isComplete = newPosition >= content.length;
        const newEndTime = isComplete ? Date.now() : null;
        
        if (isComplete && !prev.endTime) {
          // Calculate final stats
          const wpm = calculateWPM(
            content,
            prev.startTime || 0,
            Date.now(),
            prev.totalPausedTime
          );
          
          const accuracy = calculateAccuracy(
            content.length,
            newMistakes.length
          );
          
          const timeSpent = prev.startTime 
            ? Math.round((Date.now() - prev.startTime - prev.totalPausedTime) / 1000)
            : 0;
          
          // Call completion callback
          onComplete({
            wpm,
            accuracy,
            timeSpent,
            errorCount: newMistakes.length
          });
        }
        
        return {
          ...prev,
          currentPosition: newPosition,
          mistakes: newMistakes,
          endTime: newEndTime
        };
      });
    }
  }, [content, onComplete, playTypeSound, state.endTime, state.isPaused, state.startTime, state.totalPausedTime]);

  const addHighlight = useCallback(() => {
    // Get the current selection
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    
    // Get the selected text and its position
    const selectedText = selection.toString();
    
    if (selectedText) {
      // Find the nearest position in the original content
      const selectionRange = selection.getRangeAt(0);
      const preSelectionRange = selectionRange.cloneRange();
      preSelectionRange.selectNodeContents(document.getElementById('typing-content') || document.body);
      preSelectionRange.setEnd(selectionRange.startContainer, selectionRange.startOffset);
      const position = preSelectionRange.toString().length;
      
      // Create a new highlight
      const newHighlight: Highlight = {
        id: Date.now().toString(),
        text: selectedText,
        position: position,
        dateCreated: new Date().toISOString()
      };
      
      setState(prev => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight]
      }));
      
      // Clear the selection
      selection.removeAllRanges();
    }
  }, []);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  // Current metrics calculation
  const getMetrics = useCallback(() => {
    const now = Date.now();
    const elapsedTime = state.startTime 
      ? (state.endTime || now) - state.startTime - state.totalPausedTime
      : 0;
    
    const wpm = state.startTime
      ? calculateWPM(
          content.substring(0, state.currentPosition),
          state.startTime,
          state.endTime || now,
          state.totalPausedTime
        )
      : 0;
    
    const accuracy = calculateAccuracy(
      Math.max(state.currentPosition, 1),
      state.mistakes.length
    );
    
    return {
      wpm,
      accuracy,
      progress: (state.currentPosition / content.length) * 100,
      elapsedSeconds: Math.floor(elapsedTime / 1000),
      errorCount: state.mistakes.length,
      paused: state.isPaused
    };
  }, [content, state]);

  return {
    typingState: state,
    metrics: getMetrics(),
    addHighlight,
    resetTest: () => {
      setState({
        currentPosition: 0,
        mistakes: [],
        startTime: null,
        endTime: null,
        isPaused: false,
        pauseStartTime: null,
        totalPausedTime: 0,
        highlights: state.highlights // Preserve highlights
      });
    }
  };
};

export default useTypingTest;