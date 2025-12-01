import React from 'react';
import { Link } from 'react-router-dom';
import './Selection.css';

function Selection() {
  return (
    <div className="selection-container">
      <div className="selection-box">
        <div className="app-header">
          <h1 className="app-title">Oral Cancer Questionnaire</h1>
          <p className="app-subtitle">Please select the appropriate questionnaire to proceed</p>
        </div>
        <h1>Are you a Patient or a Physician?</h1>
        <div className="selection-buttons">
          <Link to="/patient">
            <button>Patient Questionnaire</button>
          </Link>
          <Link to="/physician">
            <button>Physician Questionnaire</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Selection;