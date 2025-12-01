import React from 'react';
import { Link } from 'react-router-dom';
import './Questionnaire.css';

const PhysicianQuestionnaire = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Form submitted successfully!');
  };

  return (
    <div className="questionnaire-container">
      <div className="header-with-button">
        <h1>Physician Questionnaire</h1>
        <Link to="/patient">
          <button type="button" className="add-patient-button">Add Patient</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Patient Information Section */}
        <div className="section-header">Patient Information</div>
        <div className="form-group">
          <label>Patient Identification Number:</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Comorbidities:</label>
          <textarea placeholder="List any relevant comorbidities..." />
        </div>

        {/* Clinical Assessment Section */}
        <div className="section-header">Clinical Assessment</div>
        <div className="form-group">
          <label>Oropharyngeal Lesion Information:</label>
          <input type="text" placeholder="Describe lesion locations and characteristics" />
        </div>
        <div className="form-group">
          <label>Laterality:</label>
          <div className="radio-group">
            <div className="radio-option">
              <input type="radio" id="left" name="laterality" value="left" />
              <label htmlFor="left">Left</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="right" name="laterality" value="right" />
              <label htmlFor="right">Right</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Size (greatest dimension in mm):</label>
          <input type="text" placeholder="Enter size in mm" />
        </div>
        <div className="form-group">
          <label>Clinical Examination Findings:</label>
          <textarea placeholder="Detailed clinical findings..." />
        </div>

        {/* Diagnostic Information Section */}
        <div className="section-header">Diagnostic Information</div>
        <div className="form-group">
          <label>Staging: TNM</label>
          <input type="text" placeholder="Enter TNM staging" />
        </div>
        <div className="form-group">
          <label>Histological Type:</label>
          <input type="text" placeholder="Enter histological type" />
        </div>
        <div className="form-group">
          <label>Grade:</label>
          <select>
            <option value="">-- Select Grade --</option>
            <option value="well">Well differentiated</option>
            <option value="moderate">Moderately differentiated</option>
            <option value="poor">Poorly differentiated</option>
          </select>
        </div>
        <div className="form-group">
          <label>Molecular Genetic Analysis:</label>
          <div className="radio-group">
            <div className="radio-option">
              <input type="radio" id="genetic_yes" name="genetic_analysis" value="yes" />
              <label htmlFor="genetic_yes">Yes</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="genetic_no" name="genetic_analysis" value="no" />
              <label htmlFor="genetic_no">No</label>
            </div>
          </div>
        </div>

        {/* Documentation Section */}
        <div className="section-header">Documentation</div>
        <div className="form-group">
          <label>Photographs (with size measuring function):</label>
          <div className="multi-input-group">
            <input type="text" placeholder="Site 1" />
            <input type="text" placeholder="Site 2" />
            <input type="text" placeholder="Site 3" />
            <input type="text" placeholder="Site 4" />
            <input type="text" placeholder="Site 5" />
            <input type="text" placeholder="Site 6" />
          </div>
        </div>
        <div className="form-group">
          <label>Histopathological Slides (uploaded from optrascan):</label>
          <div className="multi-input-group">
            <input type="text" placeholder="Site 1" />
            <input type="text" placeholder="Site 2" />
            <input type="text" placeholder="Site 3" />
            <input type="text" placeholder="Site 4" />
            <input type="text" placeholder="Site 5" />
            <input type="text" placeholder="Site 6" />
          </div>
        </div>
        <div className="form-group">
          <label>Photograph/Biopsy Site Unique Identifier:</label>
          <input type="text" placeholder="Enter unique identifier" />
        </div>

        {/* Follow-up Section */}
        <div className="section-header">Follow-up Information</div>
        <div className="form-group">
          <label>Follow-up Details:</label>
          <textarea placeholder="Enter follow-up plan and details..." />
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="submit-button">Submit </button>
        </div>
      </form>
    </div>
  );
};

export default PhysicianQuestionnaire;
