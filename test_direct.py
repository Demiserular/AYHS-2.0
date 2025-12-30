"""Direct test of prediction service"""
import json
from ml_service.predict import predict

# Test data
test_patient = {
    'age': 55,
    'gender': 'Male',
    'education_level': 'High School',
    'income_level': 'Low',
    'living_situation': 'Alone',
    'has_insurance': False,
    'num_conditions': 3,
    'num_medications': 5,
    'medication_complexity': 'High',
    'average_monthly_cost': 450,
    'adherence_score': 45,
    'missed_doses_last_month': 8,
    'using_reminder_app': False,
    'refill_on_time': False,
    'patient_notes': 'Patient struggles with medication costs and often forgets to take medications',
    'sentiment_polarity': -0.2,
    'sentiment_subjectivity': 0.6
}

print("Testing prediction service...")
result = predict(test_patient)
print("\nResult:")
print(json.dumps(result, indent=2))

# Check if all expected fields are present
expected_fields = ['prediction', 'is_non_adherent', 'risk_probability', 
                   'adherence_probability', 'risk_level', 'confidence']

print("\nField validation:")
for field in expected_fields:
    if field in result:
        print(f"✓ {field}: {result[field]}")
    else:
        print(f"✗ Missing: {field}")
