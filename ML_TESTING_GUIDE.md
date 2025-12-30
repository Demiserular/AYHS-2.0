# ML Integration - Testing Guide

## 🎉 Your ML Model is Integrated!

### What's Been Set Up:

1. **Python Prediction Service** (`ml_service/predict.py`)
   - Loads your trained model
   - Preprocesses input data
   - Makes predictions with confidence scores

2. **Backend API Endpoint** (`/api/predict-adherence`)
   - Receives patient data from frontend
   - Calls Python service
   - Returns prediction results

3. **Frontend Predictor Page** (`/predict`)
   - Beautiful form to enter patient data
   - Real-time predictions
   - Visual risk assessment
   - Actionable recommendations

### How to Test:

#### Option 1: Use the Web Interface (Recommended)
1. Open your browser to: `http://localhost:5174/predict`
2. Fill in the patient information form
3. Click "🔬 Predict Adherence Risk"
4. View the prediction results with risk level and recommendations

#### Option 2: Test with Python Script
```bash
cd c:\Users\sc895\Project\AYHS
python test_prediction.py
```

#### Option 3: Test API Directly with curl/Postman
```bash
POST http://localhost:3001/api/predict-adherence
Content-Type: application/json

{
  "age": 55,
  "gender": "Male",
  "education_level": "High School",
  "income_level": "Low",
  "living_situation": "Alone",
  "has_insurance": false,
  "num_conditions": 3,
  "num_medications": 5,
  "medication_complexity": "High",
  "average_monthly_cost": 450,
  "adherence_score": 45,
  "missed_doses_last_month": 8,
  "using_reminder_app": false,
  "refill_on_time": false,
  "patient_notes": "Patient struggles with cost and forgetfulness",
  "sentiment_polarity": -0.2,
  "sentiment_subjectivity": 0.6
}
```

### Test Scenarios:

#### High Risk Patient:
- Age: 65
- Low income
- Living alone
- No insurance
- High medication complexity
- Low adherence score (< 50%)
- Many missed doses
- Negative sentiment notes

#### Low Risk Patient:
- Age: 45
- Middle/High income
- Living with family
- Has insurance
- Low medication complexity
- High adherence score (> 80%)
- Few/no missed doses
- Positive sentiment notes

### Expected Response Format:
```json
{
  "prediction": 1,
  "is_non_adherent": true,
  "risk_probability": 0.85,
  "adherence_probability": 0.15,
  "risk_level": "Critical",
  "confidence": 0.85
}
```

### Risk Levels:
- **Low**: < 30% risk
- **Medium**: 30-60% risk
- **High**: 60-80% risk
- **Critical**: > 80% risk

### Troubleshooting:

1. **Model not found error**:
   - Make sure you ran all cells in the notebook
   - Check that `models/best_adherence_model.pkl` exists

2. **Python module errors**:
   - Install required packages: `pip install scikit-learn pandas numpy joblib`

3. **Backend errors**:
   - Check backend logs in terminal
   - Ensure Python is in your PATH

4. **Frontend errors**:
   - Clear browser cache
   - Check console for errors (F12)

### Current Status:
✅ Backend: Running on port 3001
✅ Frontend: Running on port 5174
✅ ML Model: Trained and saved
✅ Prediction Service: Ready
✅ API Endpoint: Configured
✅ UI Page: Created

### Next Steps:
1. Open `http://localhost:5174/predict` in your browser
2. Fill in the form with test data
3. Click "Predict Adherence Risk"
4. View results and recommendations!

### Features:
- 🔬 Real-time ML predictions
- 📊 Visual risk assessment
- 💡 Actionable recommendations
- 🎨 Beautiful, responsive UI
- ⚡ Fast prediction (< 1 second)
- 🛡️ Input validation
- 📈 Confidence scores

Enjoy testing your ML-powered adherence predictor! 🚀
