
import React from 'react';
import { X } from 'lucide-react';
import { Highlight } from '../../types';

interface HighlightSidebarProps {
  highlights: Highlight[];
  isOpen: boolean;
  onClose: () => void;
  onDeleteHighlight: (id: string) => void;
}

const HighlightSidebar: React.FC<HighlightSidebarProps> = ({
  highlights,
  isOpen,
  onClose,
  onDeleteHighlight
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-40">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-primary-900 dark:text-cream-100">Highlights</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-64px)]">
        {highlights.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic text-center">
            No highlights yet
          </p>
        ) : (
          highlights.map(highlight => (
            <div
              key={highlight.id}
              className="bg-cream-50 dark:bg-primary-800 p-4 rounded-lg"
            >
              <p className="text-primary-900 dark:text-cream-100 mb-2">"{highlight.text}"</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {new Date(highlight.dateCreated).toLocaleString()}
                </span>
                <button
                  onClick={() => onDeleteHighlight(highlight.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400"
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

export default HighlightSidebar;
