import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Reportar from './pages/Reportar';
import NotFound from './pages/404'; // Import the 404 page component
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/reportar" />} />
        <Route path="/reportar" element={<Reportar />} />
        <Route path="*" element={<NotFound />} /> {/* Use the 404 page component */}
      </Routes>
    </div>
  );
};

export default App;
