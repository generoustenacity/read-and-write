import React, { useState, useEffect } from 'react';
import { PauseCircle, PlayCircle, HighlighterIcon } from 'lucide-react';
import useTypingTest from '../../hooks/useTypingTest';
import ProgressMetrics from './ProgressMetrics';
import { Article } from '../../types';
import Button from '../ui/Button';

interface TypingInterfaceProps {
  article: Article;
  onComplete: (stats: {
    wpm: number;
    accuracy: number;
    timeSpent: number;
    errorCount: number;
  }) => void;
  onUpdateHighlights: (highlights: any[]) => void;
  audioEnabled: boolean;
  audioType: string;
}

const TypingInterface: React.FC<TypingInterfaceProps> = ({
  article,
  onComplete,
  onUpdateHighlights,
  audioEnabled,
  audioType,
  onToggleSidebar
}) => {
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'h' && window.getSelection()?.toString()) {
        e.preventDefault();
        handleHighlightSelection();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const selection = window.getSelection()?.toString();
    if (selection) {
      setSelectedText(selection);
      setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
    }
  };

  const handleHighlightSelection = () => {
    const selection = selectedText || window.getSelection()?.toString();
    if (selection) {
      const highlight = {
        id: Date.now().toString(),
        text: selection,
        position: typingState.currentPosition,
        dateCreated: new Date().toISOString()
      };
      typingState.highlights.push(highlight);
      onUpdateHighlights(typingState.highlights);
    }
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(selectedText);
    setContextMenu({ visible: false, x: 0, y: 0 });
  };
  const { typingState, metrics, addHighlight, resetTest } = useTypingTest({
    content: article.content,
    onComplete,
    audioEnabled,
    soundType: audioType
  });

  // Save highlights when they change
  useEffect(() => {
    if (typingState.highlights.length > 0) {
      onUpdateHighlights(typingState.highlights);
    }
  }, [typingState.highlights, onUpdateHighlights]);

  // Prepare text display with proper formatting
  const renderText = () => {
    const content = article.content;
    const currentPosition = typingState.currentPosition;
    const mistakes = typingState.mistakes;

    // Text the user has already typed
    const typedText = content.substring(0, currentPosition);

    // Text yet to be typed
    const remainingText = content.substring(currentPosition);

    return (
      <div id="typing-content" className="relative font-mono text-lg leading-relaxed">
        {/* Text already typed */}
        <span className="text-gray-900 dark:text-gray-100">
          {typedText.split('').map((char, index) => {
            const isHighlighted = article.highlights.some(h => 
              index >= h.position && index < h.position + h.text.length
            );
            return (
              <span 
                key={index}
                className={`${
                  mistakes.includes(index) 
                    ? 'text-red-500 dark:text-red-400' 
                    : ''
                } ${
                  isHighlighted 
                    ? 'bg-yellow-100 dark:bg-yellow-900/30' 
                    : ''
                }`}
              >
                {char}
              </span>
            );
          })}
        </span>

        {/* Cursor */}
        <span className={`inline-block w-0.5 h-5 bg-blue-500 dark:bg-blue-400 animate-blink mx-0.5 ${typingState.isPaused ? 'opacity-50' : ''}`}></span>

        {/* Text yet to be typed */}
        <span className="text-gray-400 dark:text-gray-500">
          {remainingText}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transition-colors duration-300">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{article.title}</h2>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<HighlighterIcon size={16} />}
            onClick={addHighlight}
          >
            Highlight
          </Button>

          {typingState.isPaused ? (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<PlayCircle size={16} />}
              onClick={() => {
                // Simulate an 'Alt' keypress to toggle pause
                const event = new KeyboardEvent('keydown', { key: 'Alt' });
                window.dispatchEvent(event);
              }}
            >
              Resume
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<PauseCircle size={16} />}
              onClick={() => {
                // Simulate an 'Alt' keypress to toggle pause
                const event = new KeyboardEvent('keydown', { key: 'Alt' });
                window.dispatchEvent(event);
              }}
            >
              Pause
            </Button>
          )}
        </div>
      </div>

      <ProgressMetrics metrics={metrics} />

      <div 
        className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-y-auto max-h-[60vh] transition-colors duration-300"
        onContextMenu={handleContextMenu}
      >
        {renderText()}
        {contextMenu.visible && (
          <div
            className="fixed bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 z-50"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={handleCopyText}
            >
              Copy
            </button>
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={handleHighlightSelection}
            >
              Highlight
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>Type the text above to read it. Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Alt</kbd> to pause/resume.</p>
        <p>Select text and click "Highlight" to save important passages.</p>
      </div>
    </div>
  );
};

export default TypingInterface;