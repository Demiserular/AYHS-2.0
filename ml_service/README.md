# Setup Guide for ML Development

## Quick Start

### 1. Install Python Dependencies

```bash
cd ml_service
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download spaCy model
python -m spacy download en_core_web_sm
```

### 2. Generate Synthetic Data

```bash
# From ml_service directory
python generate_synthetic_data.py
```

This will create 5 CSV files in the `data/` directory:
- `patients.csv` (5,000 patients)
- `medical_conditions.csv` (~7,500 records)
- `medications.csv` (~12,000 prescriptions)
- `adherence_records.csv` (5,000 records with ML features)
- `interaction_logs.csv` (5,000 behavioral records)

### 3. Verify Data Generation

```python
import pandas as pd

# Check files
adherence = pd.read_csv('../data/adherence_records.csv')
print(f"Total patients: {len(adherence)}")
print(f"Non-adherent: {adherence['is_non_adherent'].sum()}")
print(f"\nTop causes:\n{adherence['primary_non_adherence_cause'].value_counts()}")
```

## What You Get

✅ **5,000 synthetic patients** with realistic profiles  
✅ **Multiple chronic conditions** per patient  
✅ **Medication prescriptions** with complexity levels  
✅ **Adherence scores** and classifications  
✅ **Non-adherence causes** for NLP analysis  
✅ **Patient notes** (text data for NLP)  
✅ **Behavioral data** (app usage, reminder responses)  
✅ **Ready for ML modeling** - features already engineered!

## Dataset Highlights

### For NLP Analysis (Task 2.3)
- Patient notes with positive/negative adherence language
- 10 categories of non-adherence causes
- Text data ready for sentiment analysis and topic modeling

### For ML Prediction (Task 3)
- Target variables: `adherence_score`, `is_adherent`, `is_non_adherent`
- 20+ features including demographics, medical, behavioral
- Realistic correlations (e.g., cost affects low-income patients)
- Temporal data (6 months of adherence trends)

### Class Balance
- ~70% adherent (realistic for chronic disease patients)
- ~30% non-adherent (focus group for intervention)

## Next Steps

1. ✅ Generate data (run script above)
2. 📊 Explore data (see notebooks/ for examples)
3. 🔍 Start NLP analysis (Task 2.3)
4. 🤖 Build ML models (Task 3)

## Data Quality

All data is:
- ✅ Synthetic (no privacy concerns)
- ✅ Realistic (based on medical research)
- ✅ Balanced (gender, age, socioeconomic)
- ✅ Complete (no missing values in key fields)
- ✅ Ready to use (CSV format)

Read `data/data_dictionary.md` for full documentation!
