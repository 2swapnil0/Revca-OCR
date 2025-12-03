import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PhysicianActions.css';

const PhysicianActions = ({ onAddNewPatient }) => {
  return (
    <div className="physician-actions-container">
      <h2>Physician Actions</h2>
      <div className="physician-actions-buttons">
        <button onClick={onAddNewPatient} className="action-button">Add New Patient</button>
      </div>
    </div>
  );
};

export default PhysicianActions;
