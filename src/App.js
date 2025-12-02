import React from 'react';
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import PatientQuestionnaire from './PatientQuestionnaire';
import PhysicianQuestionnaire from './PhysicianQuestionnaire';
import Login from './Login';
import './App.css';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="App">
      {(location.pathname === '/physician' || (isAuthenticated && location.pathname === '/patient')) && (
        <nav className="main-nav">
          {isAuthenticated && location.pathname === '/patient' && (
            <Link to="/physician" className="back-to-selection">← Back to Physician Details</Link>
          )}
          {isAuthenticated && (
            <button onClick={handleLogout} className="logout-button">Logout</button>
          )}
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/patient" />} />
        <Route path="/patient" element={<PatientQuestionnaire />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/physician"
          element={
            <PrivateRoute>
              <PhysicianQuestionnaire />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
