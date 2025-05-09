export const extractContentFromText = (text: string): { title: string; content: string } => {
  // Extract a title from the first line if possible
  const lines = text.split('\n');
  let title = lines[0].trim();
  let content = text;
  
  // If the first line is reasonably short, use it as a title and remove from content
  if (title.length <= 100 && lines.length > 1) {
    content = lines.slice(1).join('\n').trim();
  } else {
    title = 'Untitled Document';
  }
  
  return { title, content };
};

export const extractMetadataFromUrl = async (url: string): Promise<{ title: string; content: string }> => {
  // In a real application, this would call a backend service to scrape the URL
  // For this demo, we'll simulate a successful fetch
  
  // This is a mock function. In a real app, you would send this URL to a backend service
  // that would use something like Readability.js or a similar library to extract the main content.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: `Article from ${new URL(url).hostname}`,
        content: `This is simulated content extracted from ${url}. In a real application, we would use server-side scraping to extract the actual content of the article.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at lorem nec arcu interdum congue. Vivamus gravida porta odio, et placerat ex pellentesque a. Nulla facilisi. Aenean a lobortis massa. Donec neque massa, semper in sollicitudin vitae, dapibus sed nisl. Nam rhoncus luctus velit, a facilisis augue auctor vel. Cras sit amet lobortis urna, non ultrices tellus.

Fusce sed rhoncus elit. Sed hendrerit ligula ut mollis tempor. Praesent accumsan purus sit amet arcu lacinia, vel sagittis lorem bibendum. Phasellus molestie, nisi sit amet elementum sodales, dolor augue porttitor nunc, eget pharetra urna libero eget ex. Nulla facilisi. Nulla facilisi.`
      });
    }, 1500);
  });
};

export const processFileContent = async (file: File): Promise<{ title: string; content: string }> => {
  // For the demo, we'll just read text files
  // In a real app, you would handle different file types (PDF, ePub, etc.)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
      resolve({
        title: fileName,
        content: text
      });
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};