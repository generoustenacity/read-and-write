import React from 'react';
import { Highlight } from '../../types';
import { Trash2 } from 'lucide-react';

interface HighlightManagerProps {
  highlights: Highlight[];
  onDeleteHighlight: (id: string) => void;
}

const HighlightManager: React.FC<HighlightManagerProps> = ({ highlights, onDeleteHighlight }) => {
  if (highlights.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-center text-gray-500 dark:text-gray-400 italic transition-colors duration-300">
        No highlights yet. Select text while reading and click "Highlight" to save important passages.
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {highlights.map((highlight) => (
        <div
          key={highlight.id}
          className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md flex justify-between items-start group transition-colors duration-300"
        >
          <div>
            <p className="text-gray-800 dark:text-gray-200 font-medium">"{highlight.text}"</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {new Date(highlight.dateCreated).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => onDeleteHighlight(highlight.id)}
            className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Delete highlight"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default HighlightManager;