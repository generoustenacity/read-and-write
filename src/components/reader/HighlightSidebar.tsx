import React from 'react';
import { Highlight } from '../../types';

interface HighlightSidebarProps {
  highlights: Highlight[];
  isOpen: boolean;
  onClose: () => void;
}

export const HighlightSidebar: React.FC<HighlightSidebarProps> = ({ highlights, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-cream-50 dark:bg-primary-900 shadow-lg p-4 overflow-y-auto transition-transform transform">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Highlights</h3>
        <button
          onClick={onClose}
          className="text-primary-600 dark:text-cream-300 hover:text-primary-800 dark:hover:text-cream-100"
        >
          ✕
        </button>
      </div>

      {highlights.length === 0 ? (
        <p className="text-primary-600 dark:text-cream-300">No highlights yet</p>
      ) : (
        <div className="space-y-4">
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              className="p-3 bg-cream-100 dark:bg-primary-800 rounded-md"
            >
              <p className="text-primary-800 dark:text-cream-100">{highlight.text}</p>
              <p className="text-sm text-primary-500 dark:text-cream-300 mt-2">
                {new Date(highlight.dateCreated).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HighlightSidebar;