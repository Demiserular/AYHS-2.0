import sys
sys.path.insert(0, 'c:/Users/sc895/Project/AYHS/ml_service')

from predict import predict

# Test data
test_patient = {
    "age": 55,
    "gender": "Male",
    "education_level": "High School",
    "income_level": "Low",
    "living_situation": "Alone",
    "has_insurance": False,
    "num_conditions": 3,
    "num_medications": 5,
    "medication_complexity": "High",
    "average_monthly_cost": 450,
    "adherence_score": 45,
    "missed_doses_last_month": 8,
    "using_reminder_app": False,
    "refill_on_time": False,
    "patient_notes": "Patient struggles with cost and forgetfulness",
    "sentiment_polarity": -0.2,
    "sentiment_subjectivity": 0.6
}

print("Testing ML Prediction Service...")
print("="*50)
print(f"Input: {test_patient}")
print("="*50)

result = predict(test_patient)
print("Prediction Result:")
print(result)
