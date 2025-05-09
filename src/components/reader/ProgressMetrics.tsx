import React from 'react';
import { Clock, AlertCircle, Activity } from 'lucide-react';

interface ProgressMetricsProps {
  metrics: {
    wpm: number;
    accuracy: number;
    progress: number;
    elapsedSeconds: number;
    errorCount: number;
    paused: boolean;
  };
}

const ProgressMetrics: React.FC<ProgressMetricsProps> = ({ metrics }) => {
  // Format elapsed time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md flex items-center transition-colors duration-300">
        <Activity className="text-blue-500 dark:text-blue-400 mr-2" size={18} />
        <div>
          <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Speed</div>
          <div className="font-semibold text-gray-800 dark:text-gray-100">{metrics.wpm} WPM</div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md flex items-center transition-colors duration-300">
        <svg className="w-[18px] h-[18px] text-green-500 dark:text-green-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <div>
          <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Accuracy</div>
          <div className="font-semibold text-gray-800 dark:text-gray-100">{metrics.accuracy}%</div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md flex items-center transition-colors duration-300">
        <Clock className="text-purple-500 dark:text-purple-400 mr-2" size={18} />
        <div>
          <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Time</div>
          <div className="font-semibold text-gray-800 dark:text-gray-100">
            {formatTime(metrics.elapsedSeconds)}
            {metrics.paused && <span className="text-xs text-purple-500 dark:text-purple-400 ml-1">(paused)</span>}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md flex items-center transition-colors duration-300">
        <AlertCircle className="text-red-500 dark:text-red-400 mr-2" size={18} />
        <div>
          <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Errors</div>
          <div className="font-semibold text-gray-800 dark:text-gray-100">{metrics.errorCount}</div>
        </div>
      </div>
      
      <div className="col-span-2 md:col-span-4 mt-1">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 transition-colors duration-300">
          <div 
            className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, metrics.progress))}%` }}
          ></div>
        </div>
        <div className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">
          {Math.round(metrics.progress)}% complete
        </div>
      </div>
    </div>
  );
};

export default ProgressMetrics;