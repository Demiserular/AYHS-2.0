"""
Synthetic Patient Data Generator for Medication Adherence Research
Generates realistic patient data with medication adherence patterns
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import json

# Set random seed for reproducibility
np.random.seed(42)
random.seed(42)

# Constants
NUM_PATIENTS = 5000
DATE_START = datetime(2023, 1, 1)
DATE_END = datetime(2024, 12, 31)

# Demographics data
FIRST_NAMES = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 
               'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
               'Thomas', 'Sarah', 'Charles', 'Karen', 'Daniel', 'Nancy', 'Matthew', 'Lisa']

LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
              'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
              'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson']

CITIES = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 
          'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
          'San Francisco', 'Columbus', 'Charlotte', 'Indianapolis', 'Seattle', 'Denver']

# Medical conditions
CHRONIC_CONDITIONS = [
    'Hypertension', 'Type 2 Diabetes', 'Asthma', 'COPD', 'Heart Disease',
    'Depression', 'Anxiety', 'Arthritis', 'Hypothyroidism', 'High Cholesterol'
]

# Medications database
MEDICATIONS = {
    'Hypertension': ['Lisinopril', 'Amlodipine', 'Losartan', 'Metoprolol'],
    'Type 2 Diabetes': ['Metformin', 'Glipizide', 'Insulin', 'Sitagliptin'],
    'Asthma': ['Albuterol', 'Fluticasone', 'Montelukast', 'Budesonide'],
    'COPD': ['Tiotropium', 'Albuterol', 'Budesonide', 'Prednisone'],
    'Heart Disease': ['Aspirin', 'Atorvastatin', 'Clopidogrel', 'Carvedilol'],
    'Depression': ['Sertraline', 'Fluoxetine', 'Escitalopram', 'Bupropion'],
    'Anxiety': ['Alprazolam', 'Lorazepam', 'Buspirone', 'Sertraline'],
    'Arthritis': ['Ibuprofen', 'Naproxen', 'Methotrexate', 'Prednisone'],
    'Hypothyroidism': ['Levothyroxine', 'Liothyronine'],
    'High Cholesterol': ['Atorvastatin', 'Simvastatin', 'Rosuvastatin', 'Pravastatin']
}

# Non-adherence causes
NON_ADHERENCE_CAUSES = [
    'Forgetfulness', 'Side effects', 'Cost concerns', 'Medication complexity',
    'Lack of understanding', 'Depression/mental health', 'Feeling better',
    'Transportation issues', 'Mistrust of medication', 'Too many medications'
]

# Patient notes/communications (for NLP analysis)
ADHERENCE_NOTES_POSITIVE = [
    "Patient reports taking medication regularly as prescribed",
    "No issues with current medication regimen",
    "Patient understands medication schedule and importance",
    "Good adherence, patient using reminder app",
    "Family support helps maintain medication schedule",
    "Patient refills prescription on time consistently"
]

ADHERENCE_NOTES_NEGATIVE = [
    "Patient forgot to take medication multiple times this week",
    "Reports side effects: nausea and dizziness, considering stopping",
    "Concerned about medication cost, may not refill",
    "Patient doesn't understand why taking this medication",
    "Too many pills to manage, feeling overwhelmed",
    "Feeling better so stopped taking medication",
    "Difficulty swallowing pills, avoiding medication",
    "Pharmacy too far, transportation is an issue",
    "Worried about long-term effects of medication",
    "Depression making it hard to maintain routine"
]

def generate_patient_demographics():
    """Generate basic patient demographic information"""
    patients = []
    
    for i in range(NUM_PATIENTS):
        patient_id = f"P{str(i+1).zfill(5)}"
        age = np.random.normal(55, 15)  # Mean age 55, SD 15
        age = max(18, min(90, int(age)))  # Clip to 18-90
        
        gender = random.choice(['Male', 'Female', 'Other'])
        
        # Education level affects adherence
        education = random.choices(
            ['High School', 'Some College', 'Bachelor', 'Graduate'],
            weights=[0.25, 0.30, 0.30, 0.15]
        )[0]
        
        # Income level affects adherence (cost barriers)
        income = random.choices(
            ['Low', 'Middle', 'High'],
            weights=[0.30, 0.50, 0.20]
        )[0]
        
        # Employment status
        if age >= 65:
            employment = random.choice(['Retired', 'Retired', 'Retired', 'Part-time'])
        else:
            employment = random.choices(
                ['Full-time', 'Part-time', 'Unemployed', 'Disabled'],
                weights=[0.60, 0.20, 0.10, 0.10]
            )[0]
        
        # Living situation affects adherence (family support)
        living_situation = random.choices(
            ['Alone', 'With Family', 'With Spouse', 'Assisted Living'],
            weights=[0.20, 0.35, 0.35, 0.10]
        )[0]
        
        patient = {
            'patient_id': patient_id,
            'first_name': random.choice(FIRST_NAMES),
            'last_name': random.choice(LAST_NAMES),
            'age': age,
            'gender': gender,
            'city': random.choice(CITIES),
            'education_level': education,
            'income_level': income,
            'employment_status': employment,
            'living_situation': living_situation,
            'has_insurance': random.choices([True, False], weights=[0.85, 0.15])[0],
            'registration_date': DATE_START + timedelta(days=random.randint(0, 365))
        }
        
        patients.append(patient)
    
    return pd.DataFrame(patients)

def generate_medical_conditions(patients_df):
    """Generate chronic medical conditions for patients"""
    conditions = []
    
    for _, patient in patients_df.iterrows():
        # Older patients more likely to have multiple conditions
        num_conditions = np.random.poisson(lam=1 + (patient['age'] - 40) / 30)
        num_conditions = max(1, min(4, num_conditions))
        
        patient_conditions = random.sample(CHRONIC_CONDITIONS, num_conditions)
        
        for condition in patient_conditions:
            conditions.append({
                'patient_id': patient['patient_id'],
                'condition': condition,
                'diagnosis_date': patient['registration_date'] - timedelta(days=random.randint(30, 1825)),
                'severity': random.choice(['Mild', 'Moderate', 'Severe'])
            })
    
    return pd.DataFrame(conditions)

def generate_medications(conditions_df, patients_df):
    """Generate medication prescriptions based on conditions"""
    medications = []
    
    for _, condition in conditions_df.iterrows():
        # Number of medications per condition
        num_meds = random.choices([1, 2, 3], weights=[0.60, 0.30, 0.10])[0]
        
        available_meds = MEDICATIONS.get(condition['condition'], ['Generic Medication'])
        prescribed_meds = random.sample(available_meds, min(num_meds, len(available_meds)))
        
        for med_name in prescribed_meds:
            # Dosage frequency affects adherence (complexity)
            frequency = random.choices(
                ['Once daily', 'Twice daily', 'Three times daily', 'Four times daily', 'As needed'],
                weights=[0.40, 0.30, 0.15, 0.10, 0.05]
            )[0]
            
            medications.append({
                'patient_id': condition['patient_id'],
                'medication_name': med_name,
                'condition': condition['condition'],
                'dosage': f"{random.choice([5, 10, 20, 25, 50, 100, 500])} mg",
                'frequency': frequency,
                'prescribe_date': condition['diagnosis_date'] + timedelta(days=random.randint(0, 30)),
                'refills_remaining': random.randint(0, 11),
                'monthly_cost': round(random.uniform(10, 250), 2)
            })
    
    return pd.DataFrame(medications)

def calculate_adherence_score(patient, num_medications, income, education, age):
    """Calculate base adherence score based on patient factors"""
    score = 80  # Base score
    
    # Age factor (older and younger less adherent)
    if age < 30 or age > 75:
        score -= 10
    
    # Medication complexity
    if num_medications > 5:
        score -= 15
    elif num_medications > 3:
        score -= 8
    
    # Economic factors
    if income == 'Low':
        score -= 12
    elif income == 'High':
        score += 5
    
    # Education
    if education == 'Graduate':
        score += 8
    elif education == 'High School':
        score -= 5
    
    # Living situation (support)
    living = patient['living_situation']
    if living in ['With Family', 'With Spouse']:
        score += 8
    elif living == 'Alone':
        score -= 8
    
    # Insurance
    if not patient['has_insurance']:
        score -= 15
    
    # Add some randomness
    score += np.random.normal(0, 10)
    
    return max(20, min(100, score))

def generate_adherence_records(patients_df, medications_df, conditions_df):
    """Generate detailed adherence records"""
    adherence_records = []
    
    for _, patient in patients_df.iterrows():
        patient_meds = medications_df[medications_df['patient_id'] == patient['patient_id']]
        patient_conditions = conditions_df[conditions_df['patient_id'] == patient['patient_id']]
        
        num_medications = len(patient_meds)
        
        # Calculate base adherence tendency
        base_adherence = calculate_adherence_score(
            patient, num_medications, 
            patient['income_level'],
            patient['education_level'],
            patient['age']
        )
        
        # Determine if patient is non-adherent (< 80% is concerning)
        is_non_adherent = base_adherence < 70
        
        # Assign primary non-adherence cause if non-adherent
        if is_non_adherent:
            # Weighted selection based on patient factors
            if patient['income_level'] == 'Low':
                primary_cause = random.choices(
                    NON_ADHERENCE_CAUSES,
                    weights=[2, 1, 5, 1, 1, 1, 1, 2, 1, 1]
                )[0]
            elif num_medications > 4:
                primary_cause = random.choices(
                    NON_ADHERENCE_CAUSES,
                    weights=[3, 1, 1, 5, 1, 1, 1, 1, 1, 3]
                )[0]
            else:
                primary_cause = random.choice(NON_ADHERENCE_CAUSES)
        else:
            primary_cause = None
        
        # Generate patient notes
        if is_non_adherent:
            note = random.choice(ADHERENCE_NOTES_NEGATIVE)
        else:
            note = random.choice(ADHERENCE_NOTES_POSITIVE)
        
        # Generate monthly adherence data for last 6 months
        monthly_adherence = []
        for month in range(6):
            # Add temporal variation
            month_variation = np.random.normal(0, 5)
            monthly_score = base_adherence + month_variation
            monthly_score = max(0, min(100, monthly_score))
            monthly_adherence.append(round(monthly_score, 1))
        
        adherence_records.append({
            'patient_id': patient['patient_id'],
            'age': patient['age'],
            'gender': patient['gender'],
            'education_level': patient['education_level'],
            'income_level': patient['income_level'],
            'living_situation': patient['living_situation'],
            'has_insurance': patient['has_insurance'],
            'num_conditions': len(patient_conditions),
            'num_medications': num_medications,
            'medication_complexity': 'High' if num_medications > 4 else 'Medium' if num_medications > 2 else 'Low',
            'average_monthly_cost': round(patient_meds['monthly_cost'].sum(), 2) if len(patient_meds) > 0 else 0,
            'adherence_score': round(base_adherence, 1),
            'is_adherent': base_adherence >= 80,
            'is_non_adherent': is_non_adherent,
            'primary_non_adherence_cause': primary_cause,
            'secondary_causes': random.sample(NON_ADHERENCE_CAUSES, random.randint(0, 2)) if is_non_adherent else [],
            'patient_notes': note,
            'last_6_months_adherence': monthly_adherence,
            'missed_doses_last_month': int((100 - base_adherence) / 100 * 30) if num_medications > 0 else 0,
            'refill_on_time': base_adherence > 75,
            'using_reminder_app': random.choices([True, False], weights=[0.40, 0.60])[0],
            'last_visit_date': DATE_END - timedelta(days=random.randint(0, 180))
        })
    
    return pd.DataFrame(adherence_records)

def generate_interaction_logs(patients_df, adherence_df):
    """Generate app interaction logs for behavioral features"""
    logs = []
    
    for _, patient in patients_df.iterrows():
        adherence = adherence_df[adherence_df['patient_id'] == patient['patient_id']].iloc[0]
        
        # More adherent patients use app more
        if adherence['is_adherent']:
            num_logins = random.randint(20, 90)
            reminder_response_rate = random.uniform(0.85, 0.98)
        else:
            num_logins = random.randint(5, 40)
            reminder_response_rate = random.uniform(0.30, 0.70)
        
        logs.append({
            'patient_id': patient['patient_id'],
            'total_logins_30_days': num_logins,
            'avg_session_duration_minutes': round(random.uniform(2, 15), 1),
            'reminder_response_rate': round(reminder_response_rate, 2),
            'medicine_searches': random.randint(0, 10),
            'chat_interactions': random.randint(0, 15),
            'reminder_snooze_rate': round(random.uniform(0.05, 0.40), 2)
        })
    
    return pd.DataFrame(logs)

def main():
    """Generate all synthetic datasets"""
    print("Generating Synthetic Patient Data for Medication Adherence Research")
    print("=" * 70)
    
    print("\n1. Generating patient demographics...")
    patients_df = generate_patient_demographics()
    print(f"   ✓ Generated {len(patients_df)} patients")
    
    print("\n2. Generating medical conditions...")
    conditions_df = generate_medical_conditions(patients_df)
    print(f"   ✓ Generated {len(conditions_df)} condition records")
    
    print("\n3. Generating medication prescriptions...")
    medications_df = generate_medications(conditions_df, patients_df)
    print(f"   ✓ Generated {len(medications_df)} medication prescriptions")
    
    print("\n4. Generating adherence records...")
    adherence_df = generate_adherence_records(patients_df, medications_df, conditions_df)
    print(f"   ✓ Generated adherence data for {len(adherence_df)} patients")
    
    print("\n5. Generating interaction logs...")
    logs_df = generate_interaction_logs(patients_df, adherence_df)
    print(f"   ✓ Generated interaction logs for {len(logs_df)} patients")
    
    # Save datasets
    print("\n6. Saving datasets...")
    patients_df.to_csv('../data/patients.csv', index=False)
    print("   ✓ Saved: data/patients.csv")
    
    conditions_df.to_csv('../data/medical_conditions.csv', index=False)
    print("   ✓ Saved: data/medical_conditions.csv")
    
    medications_df.to_csv('../data/medications.csv', index=False)
    print("   ✓ Saved: data/medications.csv")
    
    adherence_df.to_csv('../data/adherence_records.csv', index=False)
    print("   ✓ Saved: data/adherence_records.csv")
    
    logs_df.to_csv('../data/interaction_logs.csv', index=False)
    print("   ✓ Saved: data/interaction_logs.csv")
    
    # Generate summary statistics
    print("\n" + "=" * 70)
    print("DATASET SUMMARY")
    print("=" * 70)
    
    print(f"\nTotal Patients: {len(patients_df)}")
    print(f"Age Range: {patients_df['age'].min():.0f} - {patients_df['age'].max():.0f}")
    print(f"Mean Age: {patients_df['age'].mean():.1f}")
    
    print(f"\nTotal Medical Conditions: {len(conditions_df)}")
    print(f"Avg Conditions per Patient: {len(conditions_df) / len(patients_df):.2f}")
    
    print(f"\nTotal Medications: {len(medications_df)}")
    print(f"Avg Medications per Patient: {len(medications_df) / len(patients_df):.2f}")
    
    non_adherent = adherence_df['is_non_adherent'].sum()
    print(f"\nAdherence Statistics:")
    print(f"  Adherent Patients (≥80%): {len(adherence_df) - non_adherent} ({(1 - non_adherent/len(adherence_df))*100:.1f}%)")
    print(f"  Non-adherent Patients (<70%): {non_adherent} ({(non_adherent/len(adherence_df))*100:.1f}%)")
    print(f"  Mean Adherence Score: {adherence_df['adherence_score'].mean():.1f}%")
    
    print(f"\nTop Non-Adherence Causes:")
    cause_counts = adherence_df['primary_non_adherence_cause'].value_counts()
    for cause, count in cause_counts.head(5).items():
        if pd.notna(cause):
            print(f"  {cause}: {count} patients")
    
    print("\n" + "=" * 70)
    print("✓ Dataset generation complete!")
    print("=" * 70)

if __name__ == "__main__":
    main()
