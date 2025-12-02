import React, { useState } from 'react';
import './Questionnaire.css';
import FileUploadPopup from './FileUploadPopup';
import { API_BASE_URL } from './config';
import Loader from './Loader';

const PatientQuestionnaire = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dialog, setDialog] = useState({ isOpen: true, message: '', isError: false });
  const [formData, setFormData] = useState({
    patient_identification_number: '',
    email: '',
    age: '',
    gender: '',
    ethnicity: '',
    education_level: '',
    occupation: '',
    smartphone_owner: '',
    cancer_awareness: '',
    family_history_oral_cancer: '',
    smoking_status: '',
    years_of_smoking: '',
    packs_per_day: '',
    years_since_stopping: '',
    alcohol_consumption: '',
    tobacco_chewing_status: '',
    tobacco_chewing_times_per_day: '',
    tobacco_chewing_duration_years: '',
    betel_nut_chewing_status: '',
    betel_nut_chewing_times_per_day: '',
    betel_nut_chewing_duration_years: '',
    gutkha_chewing_status: '',
    gutkha_chewing_times_per_day: '',
    gutkha_chewing_duration_years: '',
    betel_quid_chewing_status: '',
    betel_quid_chewing_times_per_day: '',
    betel_quid_chewing_duration_years: '',
    mishri_use_status: '',
    mishri_use_times_per_day: '',
    mishri_use_duration_years: '',
    symptoms_lumps: '',
    symptoms_soreness: '',
    symptoms_pain_swallowing: '',
    symptoms_difficulty_swallowing: '',
    symptoms_difficulty_moving_tongue: '',
    symptoms_difficulty_opening_jaw: '',
    symptoms_white_patches: '',
    duration_of_symptoms: '',
  });
  const [photos, setPhotos] = useState({});
  const [imageIds, setImageIds] = useState({});
  const [activePhotoPopup, setActivePhotoPopup] = useState(null);

  const handleFileChange = (e, site) => {
    // This function may no longer be necessary if all file selection happens in the popup
  };

  const handlePhotoSelect = (result, file, site) => {
    setImageIds(prevIds => ({
      ...prevIds,
      [site]: result.id
    }));
    setPhotos(prevPhotos => ({
      ...prevPhotos,
      [site]: true
    }));
  };

  const openPhotoPopup = (site) => {
    setActivePhotoPopup(site);
  };

  const closePhotoPopup = () => {
    setActivePhotoPopup(null);
  };

  const resetForm = () => {
    setFormData({
      patient_identification_number: '',
      email: '',
      age: '',
      gender: '',
      ethnicity: '',
      education_level: '',
      occupation: '',
      smartphone_owner: '',
      cancer_awareness: '',
      family_history_oral_cancer: '',
      smoking_status: '',
      years_of_smoking: '',
      packs_per_day: '',
      years_since_stopping: '',
      alcohol_consumption: '',
      tobacco_chewing_status: '',
      tobacco_chewing_times_per_day: '',
      tobacco_chewing_duration_years: '',
      betel_nut_chewing_status: '',
      betel_nut_chewing_times_per_day: '',
      betel_nut_chewing_duration_years: '',
      gutkha_chewing_status: '',
      gutkha_chewing_times_per_day: '',
      gutkha_chewing_duration_years: '',
      betel_quid_chewing_status: '',
      betel_quid_chewing_times_per_day: '',
      betel_quid_chewing_duration_years: '',
      mishri_use_status: '',
      mishri_use_times_per_day: '',
      mishri_use_duration_years: '',
      symptoms_lumps: '',
      symptoms_soreness: '',
      symptoms_pain_swallowing: '',
      symptoms_difficulty_swallowing: '',
      symptoms_difficulty_moving_tongue: '',
      symptoms_difficulty_opening_jaw: '',
      symptoms_white_patches: '',
      duration_of_symptoms: '',
    });
    setPhotos({});
    setImageIds({});
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
    setIsLoading(true);

    const images = Object.values(imageIds);
    const dataToSend = { ...formData, images };

    // Convert empty strings to null, as the backend might expect that for optional fields
    Object.keys(dataToSend).forEach(key => {
      if (dataToSend[key] === '') {
        dataToSend[key] = null;
      }
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/patient_questionnaire/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setDialog({ isOpen: true, message: 'Form submitted successfully!', isError: false });
        resetForm();
      } else {
        const errorData = await response.json();
        console.error('Form submission failed:', errorData);
        setDialog({ isOpen: true, message: `Form submission failed: ${JSON.stringify(errorData)}`, isError: true });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setDialog({ isOpen: true, message: 'An error occurred during form submission', isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  const renderOralHabit = (habitName, label) => {
    const status = formData[`${habitName}_status`];
    const timesPerDay = formData[`${habitName}_times_per_day`];
    const durationYears = formData[`${habitName}_duration_years`];

    return (
      <div className="form-group">
        <label>{label}</label>
        <div className="radio-group">
          {['daily', 'weekly', 'ex_user', 'never'].map(option => (
            <div className="radio-option" key={option}>
              <input
                type="radio"
                id={`${habitName}_${option}`}
                name={`${habitName}_status`}
                value={option}
                checked={status === option}
                onChange={handleChange}
              />
              <label htmlFor={`${habitName}_${option}`}>{option.charAt(0).toUpperCase() + option.slice(1).replace('_', ' ')}</label>
            </div>
          ))}
        </div>
        {(status === 'daily' || status === 'weekly' || status === 'ex_user') && (
          <div className="multi-input-group">
            {status === 'daily' && (
              <div>
                <label>Times per day:</label>
                <input
                  type="text"
                  name={`${habitName}_times_per_day`}
                  placeholder="e.g., 5"
                  value={timesPerDay}
                  onChange={handleChange}
                />
              </div>
            )}
            <div>
              <label>Duration (years):</label>
              <input
                type="text"
                name={`${habitName}_duration_years`}
                placeholder="e.g., 10"
                value={durationYears}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDialog = () => {
    if (!dialog.isOpen) return null;

    return (
      <div className="dialog-overlay">
        <div className={`dialog-container ${dialog.isError ? 'error' : 'success'}`}>
          <div className="dialog-header">
            <h3>{dialog.isError ? 'Error' : 'Success'}</h3>
            <button className="close-button" onClick={() => setDialog({ isOpen: false, message: '', isError: false })}>×</button>
          </div>
          <div className="dialog-content">
            <p>{dialog.message}</p>
          </div>
          <div className="dialog-footer">
            <button className="confirm-button" onClick={() => setDialog({ isOpen: false, message: '', isError: false })}>OK</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="questionnaire-container">
      {isLoading && <Loader />}
      {renderDialog()}
      <h1>Patient Questionnaire</h1>
      <form onSubmit={handleSubmit} className="mobile-friendly-form">
        {/* Personal Information Section */}
        <div className="section-header">Personal Information</div>
        <div className="form-group">
          <label>Patient Identification Number:</label>
          <input type="text" name="patient_identification_number" value={formData.patient_identification_number} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="text" name="age" placeholder="Enter your age" value={formData.age} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <div className="radio-option">
              <input type="radio" id="male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
              <label htmlFor="male">Male</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="female" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Ethnicity:</label>
          <div className="radio-group">
            <div className="radio-option">
              <input type="radio" id="indian" name="ethnicity" value="indian" checked={formData.ethnicity === 'indian'} onChange={handleChange} />
              <label htmlFor="indian">Indian</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="other_ethnicity" name="ethnicity" value="other" checked={formData.ethnicity === 'other'} onChange={handleChange} />
              <label htmlFor="other_ethnicity">Other:</label>
              <input type="text" name="ethnicity_other" placeholder="Please specify" onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Highest level of education completed:</label>
          <select name="education_level" value={formData.education_level} onChange={handleChange}>
            <option value="">-- Select Education Level --</option>
            <option value="primary">Primary school (5-12 years)</option>
            <option value="middle">Middle school (12-14 years)</option>
            <option value="secondary">Secondary school (14-16 years)</option>
            <option value="senior">Senior secondary school (16-18)</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="postgraduate">Postgraduate</option>
          </select>
        </div>
        <div className="form-group">
          <label>Current or previous occupation:</label>
          <input type="text" name="occupation" placeholder="Enter your occupation" value={formData.occupation} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Do you own a smartphone?</label>
          <div className="radio-group">
            <div className="radio-option">
              <input type="radio" id="smartphone_yes" name="smartphone_owner" value="yes" checked={formData.smartphone_owner === 'yes'} onChange={handleChange} />
              <label htmlFor="smartphone_yes">Yes</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="smartphone_no" name="smartphone_owner" value="no" checked={formData.smartphone_owner === 'no'} onChange={handleChange} />
              <label htmlFor="smartphone_no">No</label>
            </div>
          </div>
        </div>

        {/* Health Awareness Section */}
        <div className="section-header">Health Awareness</div>
        <div className="form-group">
          <label>Can chewing betel nut / areca nut / supari cause cancer?</label>
          <div className="radio-group">
            <div className="radio-option">
              <input type="radio" id="cancer_awareness_yes" name="cancer_awareness" value="yes" checked={formData.cancer_awareness === 'yes'} onChange={handleChange} />
              <label htmlFor="cancer_awareness_yes">Yes</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="cancer_awareness_no" name="cancer_awareness" value="no" checked={formData.cancer_awareness === 'no'} onChange={handleChange} />
              <label htmlFor="cancer_awareness_no">No</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Family history of oral cavity cancer?</label>
          <div className="radio-group">
            <div className="radio-option">
              <input type="radio" id="family_history_yes" name="family_history_oral_cancer" value="yes" checked={formData.family_history_oral_cancer === 'yes'} onChange={handleChange} />
              <label htmlFor="family_history_yes">Yes</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="family_history_no" name="family_history_oral_cancer" value="no" checked={formData.family_history_oral_cancer === 'no'} onChange={handleChange} />
              <label htmlFor="family_history_no">No</label>
            </div>
          </div>
        </div>

        {/* Lifestyle Habits Section */}
        <div className="section-header">Lifestyle Habits</div>
        <div className="form-group">
          <label>Smoking Status:</label>
          <div className="radio-group">
            <div className="radio-option">
              <input type="radio" id="smoker" name="smoking_status" value="smoker" checked={formData.smoking_status === 'smoker'} onChange={handleChange} />
              <label htmlFor="smoker">Smoker</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="ex_smoker" name="smoking_status" value="ex-smoker" checked={formData.smoking_status === 'ex-smoker'} onChange={handleChange} />
              <label htmlFor="ex_smoker">Ex-smoker</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="never_smoked" name="smoking_status" value="never" checked={formData.smoking_status === 'never'} onChange={handleChange} />
              <label htmlFor="never_smoked">Never smoked</label>
            </div>
          </div>
        </div>
        {(formData.smoking_status === 'smoker' || formData.smoking_status === 'ex-smoker') && (
          <div className="form-group">
            <label>If smoker or ex-smoker:</label>
            <div className="multi-input-group">
              <div>
                <label>Years of smoking:</label>
                <input type="text" name="years_of_smoking" placeholder="Number of years" value={formData.years_of_smoking} onChange={handleChange} />
              </div>
              <div>
                <label>Packs per day:</label>
                <input type="text" name="packs_per_day" placeholder="Number of packs" value={formData.packs_per_day} onChange={handleChange} />
              </div>
              <div>
                <label>If ex-smoker, years since stopping:</label>
                <input type="text" name="years_since_stopping" placeholder="Number of years" value={formData.years_since_stopping} onChange={handleChange} />
              </div>
            </div>
          </div>
        )}
        <div className="form-group">
          <label>Alcohol Consumption:</label>
          <input type="text" name="alcohol_consumption" placeholder="Estimate units per week" value={formData.alcohol_consumption} onChange={handleChange} />
        </div>

        {/* Oral Habits Section */}
        <div className="section-header">Oral Habits</div>
        {renderOralHabit('tobacco_chewing', 'Tobacco chewing:')}
        {renderOralHabit('betel_nut_chewing', 'Betel nut (supari) chewing:')}
        {renderOralHabit('gutkha_chewing', 'Gutkha chewing:')}
        {renderOralHabit('betel_quid_chewing', 'Betel quid chewing:')}
        {renderOralHabit('mishri_use', 'Mishri use:')}

        {/* Symptoms Section */}
        <div className="section-header">Symptoms</div>
        <div className="form-group">
          <label>Do you have any lumps, lesions or ulcers in the mouth or throat which are not healing?</label>
          <div className="radio-group">
            <div className="radio-option">
              <input type="radio" id="symptoms1_yes" name="symptoms_lumps" value="yes" checked={formData.symptoms_lumps === 'yes'} onChange={handleChange} />
              <label htmlFor="symptoms1_yes">Yes</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="symptoms1_no" name="symptoms_lumps" value="no" checked={formData.symptoms_lumps === 'no'} onChange={handleChange} />
              <label htmlFor="symptoms1_no">No</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Do you have any soreness or pain in your mouth or throat?</label>
          <div className="radio-group">
            <div className="radio-option">
              <input type="radio" id="symptoms2_yes" name="symptoms_soreness" value="yes" checked={formData.symptoms_soreness === 'yes'} onChange={handleChange} />
              <label htmlFor="symptoms2_yes">Yes</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="symptoms2_no" name="symptoms_soreness" value="no" checked={formData.symptoms_soreness === 'no'} onChange={handleChange} />
              <label htmlFor="symptoms2_no">No</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Do you have any pain when you swallow?</label>
          <div className="radio-group">
            <div className="radio-option">
              <input type="radio" id="symptoms3_yes" name="symptoms_pain_swallowing" value="yes" checked={formData.symptoms_pain_swallowing === 'yes'} onChange={handleChange} />
              <label htmlFor="symptoms3_yes">Yes</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="symptoms3_no" name="symptoms_pain_swallowing" value="no" checked={formData.symptoms_pain_swallowing === 'no'} onChange={handleChange} />
              <label htmlFor="symptoms3_no">No</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Do you have any difficulty swallowing?</label>
          <div className="radio-group">
            <div className="radio-option">
              <input type="radio" id="symptoms4_yes" name="symptoms_difficulty_swallowing" value="yes" checked={formData.symptoms_difficulty_swallowing === 'yes'} onChange={handleChange} />
              <label htmlFor="symptoms4_yes">Yes</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="symptoms4_no" name="symptoms_difficulty_swallowing" value="no" checked={formData.symptoms_difficulty_swallowing === 'no'} onChange={handleChange} />
              <label htmlFor="symptoms4_no">No</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Do you have any difficulty moving your tongue?</label>
          <div className="radio-group">
            <div className="radio-option">
              <input type="radio" id="symptoms5_yes" name="symptoms_difficulty_moving_tongue" value="yes" checked={formData.symptoms_difficulty_moving_tongue === 'yes'} onChange={handleChange} />
              <label htmlFor="symptoms5_yes">Yes</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="symptoms5_no" name="symptoms_difficulty_moving_tongue" value="no" checked={formData.symptoms_difficulty_moving_tongue === 'no'} onChange={handleChange} />
              <label htmlFor="symptoms5_no">No</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Do you have any difficulty opening or moving your jaw?</label>
          <div className="radio-group">
            <div className="radio-option">
              <input type="radio" id="symptoms6_yes" name="symptoms_difficulty_opening_jaw" value="yes" checked={formData.symptoms_difficulty_opening_jaw === 'yes'} onChange={handleChange} />
              <label htmlFor="symptoms6_yes">Yes</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="symptoms6_no" name="symptoms_difficulty_opening_jaw" value="no" checked={formData.symptoms_difficulty_opening_jaw === 'no'} onChange={handleChange} />
              <label htmlFor="symptoms6_no">No</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Do you have any white patches inside your mouth?</label>
          <div className="radio-group">
            <div className="radio-option">
              <input type="radio" id="symptoms7_yes" name="symptoms_white_patches" value="yes" checked={formData.symptoms_white_patches === 'yes'} onChange={handleChange} />
              <label htmlFor="symptoms7_yes">Yes</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="symptoms7_no" name="symptoms_white_patches" value="no" checked={formData.symptoms_white_patches === 'no'} onChange={handleChange} />
              <label htmlFor="symptoms7_no">No</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Duration of symptoms:</label>
          <select name="duration_of_symptoms" value={formData.duration_of_symptoms} onChange={handleChange}>
            <option value="">-- Select Duration --</option>
            <option value="less_than_2_weeks">Less than 2 weeks</option>
            <option value="2_weeks_to_3_months">2 weeks – 3 months</option>
            <option value="3_to_6_months">3 – 6 months</option>
            <option value="6_to_12_months">6 - 12 months</option>
            <option value="1_to_3_years">1 – 3 years</option>
            <option value="more_than_3_years">More than 3 years</option>
          </select>
        </div>

        {/* Documentation Section */}
        <div className="section-header">Documentation</div>
        <div className="form-group">
          <label>Photographs:</label>
          <div className="multi-input-group">
            {[
              "Upper Lip", "Lower Lip", "Left Cheeks (Inside)", "Right Cheeks (Inside)",
              "Tongue Top", "Tongue Back", "Left Side Tongue", "Right Side Tongue",
              "Roof of Mouth", "Bottom of Mouth", "Gums", "Back of Throat"
            ].map(site => (
              <div key={site} className="file-input-container">
                <label>{site}:</label>
                <button
                  type="button"
                  className="file-upload-button"
                  onClick={() => openPhotoPopup(site)}
                >
                  {photos[site] ? 'Change Photo' : 'Add Photo'}
                </button>
              </div>
            ))}
          </div>
          {activePhotoPopup && (
            <FileUploadPopup
              isOpen={!!activePhotoPopup}
              onClose={closePhotoPopup}
              onFileSelect={handlePhotoSelect}
              site={activePhotoPopup}
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientQuestionnaire;
