import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Questionnaire.css';
import FileUploadPopup from './FileUploadPopup';
import { API_BASE_URL } from './config';

const PhysicianQuestionnaire = () => {
  const [formData, setFormData] = useState({
    patient_identification_number: '',
    comorbidities: '',
    oropharyngeal_lesion_info: '',
    laterality: '',
    size_in_mm: '',
    clinical_examination_findings: '',
    tnm_staging: '',
    histological_type: '',
    grade: '',
    molecular_genetic_analysis: '',
    photo_biopsy_site_unique_identifier: '',
    follow_up_details: '',
  });
  const [photos, setPhotos] = useState({});
  const [slides, setSlides] = useState({});
  const [activePhotoPopup, setActivePhotoPopup] = useState(null);
  const [activeSlidePopup, setActiveSlidePopup] = useState(null);

  const handleFileChange = (e, site) => {
    if (e.target.files && e.target.files[0]) {
      setPhotos(prevPhotos => ({
        ...prevPhotos,
        [site]: e.target.files[0]
      }));
    }
  };

  const handleSlideChange = (e, site) => {
    if (e.target.files && e.target.files[0]) {
      setSlides(prevSlides => ({
        ...prevSlides,
        [site]: e.target.files[0]
      }));
    }
  };

  const handlePhotoSelect = (file, site) => {
    setPhotos(prevPhotos => ({
      ...prevPhotos,
      [site]: file
    }));
  };

  const handleSlideSelect = (file, site) => {
    setSlides(prevSlides => ({
      ...prevSlides,
      [site]: file
    }));
  };

  const openPhotoPopup = (site) => {
    setActivePhotoPopup(site);
  };

  const closePhotoPopup = () => {
    setActivePhotoPopup(null);
  };

  const openSlidePopup = (site) => {
    setActiveSlidePopup(site);
  };

  const closeSlidePopup = () => {
    setActiveSlidePopup(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();

    Object.keys(formData).forEach(key => {
      postData.append(key, formData[key]);
    });

    Object.keys(photos).forEach(key => {
      postData.append(`photo_${key}`, photos[key]);
    });

    Object.keys(slides).forEach(key => {
      postData.append(`slide_${key}`, slides[key]);
    });

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_BASE_URL}/physician-questionnaire/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
        },
        body: postData,
      });

      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        alert('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred during form submission');
    }
  };

  return (
    <div className="questionnaire-container">
      <div className="header-with-button">
        <h1>Physician Questionnaire</h1>
        <Link to="/patient">
          <button type="button" className="add-patient-button">Add Patient</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="mobile-friendly-form">
        {/* Patient Information Section */}
        <div className="section-header">Patient Information</div>
        <div className="form-group">
          <label>Patient Identification Number:</label>
          <input type="text" name="patient_identification_number" value={formData.patient_identification_number} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Comorbidities:</label>
          <textarea name="comorbidities" placeholder="List any relevant comorbidities..." value={formData.comorbidities} onChange={handleChange} />
        </div>

        {/* Clinical Assessment Section */}
        <div className="section-header">Clinical Assessment</div>
        <div className="form-group">
          <label>Oropharyngeal Lesion Information:</label>
          <input type="text" name="oropharyngeal_lesion_info" placeholder="Describe lesion locations and characteristics" value={formData.oropharyngeal_lesion_info} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Laterality:</label>
          <div className="radio-group">
            <div className="radio-option">
              <input type="radio" id="left" name="laterality" value="left" onChange={handleChange} />
              <label htmlFor="left">Left</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="right" name="laterality" value="right" onChange={handleChange} />
              <label htmlFor="right">Right</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Size (greatest dimension in mm):</label>
          <input type="text" name="size_in_mm" placeholder="Enter size in mm" value={formData.size_in_mm} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Clinical Examination Findings:</label>
          <textarea name="clinical_examination_findings" placeholder="Detailed clinical findings..." value={formData.clinical_examination_findings} onChange={handleChange} />
        </div>

        {/* Diagnostic Information Section */}
        <div className="section-header">Diagnostic Information</div>
        <div className="form-group">
          <label>Staging: TNM</label>
          <input type="text" name="tnm_staging" placeholder="Enter TNM staging" value={formData.tnm_staging} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Histological Type:</label>
          <input type="text" name="histological_type" placeholder="Enter histological type" value={formData.histological_type} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Grade:</label>
          <select name="grade" value={formData.grade} onChange={handleChange}>
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
              <input type="radio" id="genetic_yes" name="molecular_genetic_analysis" value="yes" onChange={handleChange} />
              <label htmlFor="genetic_yes">Yes</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="genetic_no" name="molecular_genetic_analysis" value="no" onChange={handleChange} />
              <label htmlFor="genetic_no">No</label>
            </div>
          </div>
        </div>

        {/* Documentation Section */}
        <div className="section-header">Documentation</div>
        <div className="form-group">
          <label>Photographs (with size measuring function):</label>
          <div className="multi-input-group">
            {[1, 2, 3, 4, 5, 6].map(site => (
              <div key={site} className="file-input-container">
                <label>Site {site}:</label>
                <button 
                  type="button" 
                  className="file-upload-button"
                  onClick={() => openPhotoPopup(`site${site}`)}
                >
                  {photos[`site${site}`] ? 'Change Photo' : 'Add Photo'}
                </button>
                {photos[`site${site}`] && (
                  <div className="file-item">
                    {photos[`site${site}`].name}
                  </div>
                )}
              </div>
            ))}
          </div>
          {activePhotoPopup && (
            <FileUploadPopup
              isOpen={!!activePhotoPopup}
              onClose={closePhotoPopup}
              onFileSelect={handlePhotoSelect}
              site={activePhotoPopup.replace('site', '')}
            />
          )}
        </div>
        <div className="form-group">
          <label>Histopathological Slides (uploaded from optrascan):</label>
          <div className="multi-input-group">
            {[1, 2, 3, 4, 5, 6].map(site => (
              <div key={site} className="file-input-container">
                <label>Site {site}:</label>
                <button 
                  type="button" 
                  className="file-upload-button"
                  onClick={() => openSlidePopup(`site${site}`)}
                >
                  {slides[`site${site}`] ? 'Change Slide' : 'Add Slide'}
                </button>
                {slides[`site${site}`] && (
                  <div className="file-item">
                    {slides[`site${site}`].name}
                  </div>
                )}
              </div>
            ))}
          </div>
          {activeSlidePopup && (
            <FileUploadPopup
              isOpen={!!activeSlidePopup}
              onClose={closeSlidePopup}
              onFileSelect={handleSlideSelect}
              site={activeSlidePopup.replace('site', '')}
            />
          )}
        </div>
        <div className="form-group">
          <label>Photograph/Biopsy Site Unique Identifier:</label>
          <input type="text" name="photo_biopsy_site_unique_identifier" placeholder="Enter unique identifier" value={formData.photo_biopsy_site_unique_identifier} onChange={handleChange} />
        </div>

        {/* Follow-up Section */}
        <div className="section-header">Follow-up Information</div>
        <div className="form-group">
          <label>Follow-up Details:</label>
          <textarea name="follow_up_details" placeholder="Enter follow-up plan and details..." value={formData.follow_up_details} onChange={handleChange} />
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
