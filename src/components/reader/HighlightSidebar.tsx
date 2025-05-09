
import React from 'react';
import { X } from 'lucide-react';
import { Highlight } from '../../types';

interface HighlightSidebarProps {
  highlights: Highlight[];
  isOpen: boolean;
  onClose: () => void;
  onDeleteHighlight: (id: string) => void;
}

export const HighlightSidebar: React.FC<HighlightSidebarProps> = ({
  highlights,
  isOpen,
  onClose,
  onDeleteHighlight
}) => {
  return (
    <div 
      className={`w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-primary-900 transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Highlights</h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-8rem)]">
        {highlights.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center italic">
            No highlights yet
          </p>
        ) : (
          highlights.map((highlight) => (
            <div
              key={highlight.id}
              className="group relative bg-cream-50 dark:bg-primary-800 rounded-lg p-4"
            >
              <p className="text-gray-900 dark:text-gray-100 mb-2">
                "{highlight.text}"
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {new Date(highlight.dateCreated).toLocaleDateString()}
                </span>
                <button
                  onClick={() => onDeleteHighlight(highlight.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-opacity"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
