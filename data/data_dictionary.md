# Medication Adherence - Data Dictionary

## Overview
This document describes the synthetic datasets generated for medication adherence research.

---

## 1. patients.csv
**Description:** Core patient demographic information

| Column | Type | Description | Values/Range |
|--------|------|-------------|--------------|
| patient_id | string | Unique patient identifier | P00001 - P05000 |
| first_name | string | Patient's first name | Various |
| last_name | string | Patient's last name | Various |
| age | integer | Patient age in years | 18 - 90 |
| gender | string | Patient gender | Male, Female, Other |
| city | string | City of residence | Various US cities |
| education_level | string | Highest education completed | High School, Some College, Bachelor, Graduate |
| income_level | string | Household income bracket | Low, Middle, High |
| employment_status | string | Current employment | Full-time, Part-time, Unemployed, Disabled, Retired |
| living_situation | string | Living arrangement | Alone, With Family, With Spouse, Assisted Living |
| has_insurance | boolean | Has health insurance | True, False |
| registration_date | date | Date enrolled in system | 2023-01-01 to 2024-01-01 |

**Total Records:** 5,000 patients

---

## 2. medical_conditions.csv
**Description:** Chronic medical conditions diagnosed for each patient

| Column | Type | Description | Values/Range |
|--------|------|-------------|--------------|
| patient_id | string | Foreign key to patients | P00001 - P05000 |
| condition | string | Medical condition name | See Condition List below |
| diagnosis_date | date | Date of diagnosis | Historical dates |
| severity | string | Condition severity | Mild, Moderate, Severe |

**Condition List:**
- Hypertension
- Type 2 Diabetes
- Asthma
- COPD
- Heart Disease
- Depression
- Anxiety
- Arthritis
- Hypothyroidism
- High Cholesterol

**Total Records:** ~7,500 condition records (avg 1.5 per patient)

---

## 3. medications.csv
**Description:** Prescribed medications for each patient's conditions

| Column | Type | Description | Values/Range |
|--------|------|-------------|--------------|
| patient_id | string | Foreign key to patients | P00001 - P05000 |
| medication_name | string | Brand/generic medication name | Various |
| condition | string | Condition being treated | See Condition List |
| dosage | string | Medication dosage | e.g., "10 mg", "500 mg" |
| frequency | string | How often to take | Once daily, Twice daily, Three times daily, Four times daily, As needed |
| prescribe_date | date | Date prescribed | Historical dates |
| refills_remaining | integer | Refills left | 0 - 11 |
| monthly_cost | float | Cost per month (USD) | $10 - $250 |

**Total Records:** ~12,000 medication prescriptions (avg 2.4 per patient)

---

## 4. adherence_records.csv
**Description:** Comprehensive adherence data and features for ML modeling

| Column | Type | Description | Values/Range |
|--------|------|-------------|--------------|
| patient_id | string | Unique patient identifier | P00001 - P05000 |
| age | integer | Patient age | 18 - 90 |
| gender | string | Patient gender | Male, Female, Other |
| education_level | string | Education level | High School, Some College, Bachelor, Graduate |
| income_level | string | Income bracket | Low, Middle, High |
| living_situation | string | Living arrangement | Alone, With Family, With Spouse, Assisted Living |
| has_insurance | boolean | Has insurance | True, False |
| num_conditions | integer | Number of chronic conditions | 1 - 4 |
| num_medications | integer | Number of medications | 1 - 12 |
| medication_complexity | string | Complexity level | Low, Medium, High |
| average_monthly_cost | float | Total medication cost/month | $0 - $1000+ |
| adherence_score | float | Overall adherence percentage | 0 - 100 |
| is_adherent | boolean | Meets adherence threshold | True (≥80%), False |
| is_non_adherent | boolean | Below adherence threshold | True (<70%), False |
| primary_non_adherence_cause | string | Main reason for non-adherence | See Causes List |
| secondary_causes | list | Additional contributing factors | List of causes |
| patient_notes | string | Clinical notes (for NLP) | Free text |
| last_6_months_adherence | list | Monthly adherence scores | Array of 6 scores |
| missed_doses_last_month | integer | Number of missed doses | 0 - 30+ |
| refill_on_time | boolean | Refills prescriptions on time | True, False |
| using_reminder_app | boolean | Uses medication reminder | True, False |
| last_visit_date | date | Last clinical visit | Recent dates |

**Non-Adherence Causes List:**
- Forgetfulness
- Side effects
- Cost concerns
- Medication complexity
- Lack of understanding
- Depression/mental health
- Feeling better (stopped early)
- Transportation issues
- Mistrust of medication
- Too many medications

**Total Records:** 5,000 (one per patient)

---

## 5. interaction_logs.csv
**Description:** App usage and behavioral data

| Column | Type | Description | Values/Range |
|--------|------|-------------|--------------|
| patient_id | string | Unique patient identifier | P00001 - P05000 |
| total_logins_30_days | integer | App logins in last 30 days | 5 - 90 |
| avg_session_duration_minutes | float | Average session length | 2 - 15 minutes |
| reminder_response_rate | float | % of reminders acknowledged | 0.30 - 0.98 |
| medicine_searches | integer | Medicine lookups in app | 0 - 10 |
| chat_interactions | integer | AI chat conversations | 0 - 15 |
| reminder_snooze_rate | float | % of reminders snoozed | 0.05 - 0.40 |

**Total Records:** 5,000 (one per patient)

---

## Data Relationships

```
patients (1) ─────── (*) medical_conditions
    │
    └─── (*) medications
    │
    └─── (1) adherence_records
    │
    └─── (1) interaction_logs
```

---

## Feature Engineering Notes

### Target Variable
- **adherence_score**: Continuous (0-100)
- **is_adherent**: Binary classification (threshold ≥80%)
- **is_non_adherent**: Binary classification (threshold <70%)

### Key Features for ML Models

**Demographic Features:**
- age, gender, education_level, income_level, living_situation, has_insurance

**Medical Complexity:**
- num_conditions, num_medications, medication_complexity, average_monthly_cost

**Behavioral Features:**
- total_logins_30_days, reminder_response_rate, using_reminder_app
- reminder_snooze_rate, refill_on_time

**Temporal Features:**
- last_6_months_adherence (trend analysis)
- missed_doses_last_month

**Text Features (NLP):**
- patient_notes (sentiment, keywords, topic modeling)

---

## Data Quality

### Missing Data
- No missing values in core demographic fields
- Some patients may have NULL for `primary_non_adherence_cause` (adherent patients)
- Empty lists for `secondary_causes` for adherent patients

### Data Balance
- **Class Distribution (is_adherent):**
  - Adherent: ~70% (realistic ratio)
  - Non-adherent: ~30%

### Data Bias Considerations
- Age distribution: Normal distribution centered at 55
- Gender: Balanced across male/female/other
- Income: Weighted toward middle class
- Geographic: US cities only (limitation)

---

## Usage Examples

### Load Data in Python
```python
import pandas as pd

# Load datasets
patients = pd.read_csv('data/patients.csv')
conditions = pd.read_csv('data/medical_conditions.csv')
medications = pd.read_csv('data/medications.csv')
adherence = pd.read_csv('data/adherence_records.csv')
logs = pd.read_csv('data/interaction_logs.csv')

# Merge for complete feature set
full_data = adherence.merge(logs, on='patient_id')
```

### Filter Non-Adherent Patients
```python
non_adherent = adherence[adherence['is_non_adherent'] == True]
print(f"Non-adherent patients: {len(non_adherent)}")
```

### Analyze Top Causes
```python
cause_counts = adherence['primary_non_adherence_cause'].value_counts()
print(cause_counts)
```

---

## Ethical Considerations

### Privacy
- All data is synthetic - no real patient information
- Patient IDs are anonymized codes
- No personally identifiable information (PII)

### Bias Mitigation
- Balanced gender representation
- Diverse age groups
- Various socioeconomic backgrounds
- Multiple urban locations

### Limitations
- Synthetic data may not capture all real-world complexity
- Based on general population statistics
- Does not include rare conditions or medications
- US-centric (cities, healthcare system)

---

## Updates and Versioning

**Version:** 1.0  
**Generated:** November 2025  
**Generator Script:** `generate_synthetic_data.py`

To regenerate with different parameters:
```bash
python ml_service/generate_synthetic_data.py
```

---

## Contact

For questions about the dataset:
- Email: shivam203093@gmail.com
- Project: AI-Driven Medication Adherence System
