import { useState } from 'react';
import axios from 'axios';
import { createMedicineReminder } from '../services/reminderService';
import { isAuthenticated } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './AdherencePredictorPage.css';

const AdherencePredictorPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        age: '55',
        gender: 'Male',
        education_level: 'High School',
        income_level: 'Low',
        living_situation: 'Alone',
        has_insurance: false,
        num_conditions: '3',
        num_medications: '5',
        medication_complexity: 'High',
        average_monthly_cost: '450',
        adherence_score: '45',
        missed_doses_last_month: '8',
        using_reminder_app: false,
        refill_on_time: false,
        patient_notes: 'Patient struggles with medication costs and often forgets to take medications',
        sentiment_polarity: -0.2,
        sentiment_subjectivity: 0.6
    });

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [reminderCreating, setReminderCreating] = useState(false);
    const [reminderSuccess, setReminderSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setPrediction(null);

        try {
            // Convert string numbers to actual numbers
            const processedData = {
                ...formData,
                age: parseFloat(formData.age),
                num_conditions: parseInt(formData.num_conditions),
                num_medications: parseInt(formData.num_medications),
                average_monthly_cost: parseFloat(formData.average_monthly_cost),
                adherence_score: parseFloat(formData.adherence_score),
                missed_doses_last_month: parseInt(formData.missed_doses_last_month),
                sentiment_polarity: parseFloat(formData.sentiment_polarity),
                sentiment_subjectivity: parseFloat(formData.sentiment_subjectivity)
            };

            const response = await axios.post('http://localhost:3001/api/predict-adherence', processedData);
            console.log('Prediction response:', response.data);

            // Validate response data
            if (response.data && typeof response.data.risk_probability === 'number') {
                setPrediction(response.data);
            } else {
                console.error('Invalid response format:', response.data);
                throw new Error('Invalid prediction response format');
            }
        } catch (err) {
            console.error('Prediction error:', err);
            console.error('Error details:', err.response?.data);
            setError(
                err.response?.data?.details ||
                err.response?.data?.error ||
                err.message ||
                'Failed to get prediction. Please check console for details.'
            );
        } finally {
            setLoading(false);
        }
    };

    const getRiskColor = (level) => {
        const colors = {
            'Low': '#4caf50',
            'Medium': '#ff9800',
            'High': '#ff5722',
            'Critical': '#d32f2f'
        };
        return colors[level] || '#9e9e9e';
    };

    const handleSetReminder = async () => {
        // Check if user is logged in
        if (!isAuthenticated()) {
            const goToLogin = window.confirm('You need to login to set reminders. Go to login page now?');
            if (goToLogin) {
                navigate('/login');
            }
            return;
        }

        setReminderCreating(true);
        setReminderSuccess(false);
        
        try {
            // Set reminder for tomorrow at 9 AM
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(9, 0, 0, 0);

            const medicationName = formData.patient_notes.split(' ')[0] || 'Medication';
            
            console.log('Creating reminder with data:', {
                medicineName: `${medicationName} - Adherence Check`,
                dosage: `${formData.num_medications} medications`,
                time: tomorrow.toISOString(),
                frequency: 'daily',
                notes: `Risk Level: ${prediction.risk_level}. Take medications as prescribed.`
            });

            const result = await createMedicineReminder(
                `${medicationName} - Adherence Check`,
                `${formData.num_medications} medications`,
                tomorrow.toISOString(),
                'daily',
                `Risk Level: ${prediction.risk_level}. Take medications as prescribed.`
            );
            
            console.log('Reminder created successfully:', result);
            setReminderSuccess(true);
            alert('✅ Reminder set successfully! Check the Reminders page to view it.');
            setTimeout(() => setReminderSuccess(false), 5000);
        } catch (err) {
            console.error('Error creating reminder:', err);
            console.error('Error details:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status
            });
            
            const errorMessage = err.response?.data?.error || err.message || 'Failed to set reminder';
            alert(`❌ Failed to set reminder: ${errorMessage}`);
        } finally {
            setReminderCreating(false);
        }
    };

    return (
        <div className="predictor-container">
            <div className="predictor-header">
                <h1>🔬 Medication Adherence Predictor</h1>
                <p>AI-powered risk assessment using machine learning</p>
            </div>

            <div className="predictor-content">
                <div className="predictor-form-section">
                    <form onSubmit={handleSubmit} className="predictor-form">
                        <h2>Patient Information</h2>

                        {/* Demographics */}
                        <div className="form-section">
                            <h3>Demographics</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Age *</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                        min="18"
                                        max="100"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Gender</label>
                                    <select name="gender" value={formData.gender} onChange={handleChange}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Education Level</label>
                                    <select name="education_level" value={formData.education_level} onChange={handleChange}>
                                        <option value="High School">High School</option>
                                        <option value="Associate">Associate</option>
                                        <option value="Bachelor">Bachelor</option>
                                        <option value="Master">Master</option>
                                        <option value="Doctorate">Doctorate</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Income Level</label>
                                    <select name="income_level" value={formData.income_level} onChange={handleChange}>
                                        <option value="Low">Low</option>
                                        <option value="Middle">Middle</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Living Situation</label>
                                    <select name="living_situation" value={formData.living_situation} onChange={handleChange}>
                                        <option value="Alone">Alone</option>
                                        <option value="With Family">With Family</option>
                                        <option value="With Spouse">With Spouse</option>
                                        <option value="Assisted Living">Assisted Living</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Has Insurance</label>
                                    <input
                                        type="checkbox"
                                        name="has_insurance"
                                        checked={formData.has_insurance}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Medical Information */}
                        <div className="form-section">
                            <h3>Medical Information</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Number of Conditions *</label>
                                    <input
                                        type="number"
                                        name="num_conditions"
                                        value={formData.num_conditions}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        max="10"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Number of Medications *</label>
                                    <input
                                        type="number"
                                        name="num_medications"
                                        value={formData.num_medications}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        max="20"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Medication Complexity</label>
                                    <select name="medication_complexity" value={formData.medication_complexity} onChange={handleChange}>
                                        <option value="Low">Low</option>
                                        <option value="Moderate">Moderate</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Avg Monthly Cost ($) *</label>
                                    <input
                                        type="number"
                                        name="average_monthly_cost"
                                        value={formData.average_monthly_cost}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Adherence Metrics */}
                        <div className="form-section">
                            <h3>Adherence Metrics</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Current Adherence Score (%) *</label>
                                    <input
                                        type="number"
                                        name="adherence_score"
                                        value={formData.adherence_score}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        max="100"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Missed Doses (Last Month) *</label>
                                    <input
                                        type="number"
                                        name="missed_doses_last_month"
                                        value={formData.missed_doses_last_month}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Using Reminder App</label>
                                    <input
                                        type="checkbox"
                                        name="using_reminder_app"
                                        checked={formData.using_reminder_app}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Refills On Time</label>
                                    <input
                                        type="checkbox"
                                        name="refill_on_time"
                                        checked={formData.refill_on_time}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Patient Notes */}
                        <div className="form-section">
                            <h3>Patient Notes (Optional)</h3>
                            <div className="form-group full-width">
                                <label>Clinical Notes</label>
                                <textarea
                                    name="patient_notes"
                                    value={formData.patient_notes}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Enter any relevant patient notes or concerns..."
                                />
                            </div>
                        </div>

                        <button type="submit" className="predict-button" disabled={loading}>
                            {loading ? '🔄 Analyzing...' : '🔬 Predict Adherence Risk'}
                        </button>
                    </form>
                </div>

                {/* Prediction Results */}
                {prediction && (
                    <div className="prediction-results">
                        <h2>📊 Prediction Results</h2>

                        <div className="result-card" style={{ borderColor: getRiskColor(prediction.risk_level) }}>
                            <div className="result-header">
                                <h3>Risk Assessment</h3>
                                <span
                                    className="risk-badge"
                                    style={{ backgroundColor: getRiskColor(prediction.risk_level) }}
                                >
                                    {prediction.risk_level} Risk
                                </span>
                            </div>

                            <div className="result-stats">
                                <div className="stat-item">
                                    <span className="stat-label">Non-Adherence Risk</span>
                                    <span className="stat-value">
                                        {prediction.risk_probability != null ?
                                            `${(prediction.risk_probability * 100).toFixed(1)}%` :
                                            'N/A'
                                        }
                                    </span>
                                </div>

                                <div className="stat-item">
                                    <span className="stat-label">Adherence Probability</span>
                                    <span className="stat-value">
                                        {prediction.adherence_probability != null ?
                                            `${(prediction.adherence_probability * 100).toFixed(1)}%` :
                                            'N/A'
                                        }
                                    </span>
                                </div>

                                <div className="stat-item">
                                    <span className="stat-label">Prediction Confidence</span>
                                    <span className="stat-value">
                                        {prediction.confidence != null ?
                                            `${(prediction.confidence * 100).toFixed(1)}%` :
                                            'N/A'
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{
                                        width: prediction.risk_probability != null ?
                                            `${(prediction.risk_probability * 100).toFixed(1)}%` :
                                            '0%',
                                        backgroundColor: getRiskColor(prediction.risk_level)
                                    }}
                                />
                            </div>

                            <div className="result-recommendation">
                                <h4>Recommendations:</h4>
                                {prediction.is_non_adherent ? (
                                    <ul>
                                        <li>⚠️ High risk of non-adherence detected</li>
                                        <li>📞 Schedule follow-up consultation</li>
                                        <li>💊 Consider medication simplification</li>
                                        <li>📱 Recommend adherence support tools</li>
                                        <li>👥 Engage family/caregivers if possible</li>
                                    </ul>
                                ) : (
                                    <ul>
                                        <li>✅ Good adherence probability</li>
                                        <li>📅 Continue regular monitoring</li>
                                        <li>🎯 Maintain current support strategies</li>
                                        <li>📊 Track adherence metrics monthly</li>
                                    </ul>
                                )}
                                
                                <button 
                                    className="set-reminder-btn"
                                    onClick={handleSetReminder}
                                    disabled={reminderCreating || reminderSuccess}
                                >
                                    {reminderCreating ? '⏳ Setting Reminder...' : 
                                     reminderSuccess ? '✅ Reminder Set!' : 
                                     '🔔 Set Daily Medication Reminder'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <h3>❌ Error</h3>
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdherencePredictorPage;
