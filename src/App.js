import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import PatientQuestionnaire from './PatientQuestionnaire';
import PhysicianQuestionnaire from './PhysicianQuestionnaire';
import Selection from './Selection';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && (
        <nav>
          <Link to="/" className="back-to-selection">← Back to Selection</Link>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Selection />} />
        <Route path="/patient" element={<PatientQuestionnaire />} />
        <Route path="/physician" element={<PhysicianQuestionnaire />} />
      </Routes>
    </div>
  );
}

export default App;
