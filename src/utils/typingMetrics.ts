export const calculateWPM = (
  textTyped: string, 
  startTime: number, 
  endTime: number, 
  pausedTime: number
): number => {
  const words = textTyped.trim().split(/\s+/).length;
  const minutes = (endTime - startTime - pausedTime) / 1000 / 60;
  
  // Avoid division by zero
  if (minutes === 0) return 0;
  
  return Math.round(words / minutes);
};

export const calculateAccuracy = (
  totalKeystrokes: number, 
  mistakes: number
): number => {
  if (totalKeystrokes === 0) return 100;
  const accuracy = ((totalKeystrokes - mistakes) / totalKeystrokes) * 100;
  return Math.round(accuracy * 100) / 100; // Round to 2 decimal places
};

export const getProgressPercentage = (
  currentPosition: number,
  totalLength: number
): number => {
  if (totalLength === 0) return 0;
  return Math.round((currentPosition / totalLength) * 100);
};