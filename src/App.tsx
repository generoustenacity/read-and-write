import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Reader from './pages/Reader';
import Library from './pages/Library';
import Settings from './pages/Settings';
import { ThemeProvider } from './context/ThemeContext';
import { ContentProvider } from './context/ContentContext';

function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reader" element={<Reader />} />
              <Route path="/library" element={<Library />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
      </ContentProvider>
    </ThemeProvider>
  );
}

export default App;