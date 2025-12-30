"""
Quick Data Exploration Script
Run this to see your generated data statistics
"""

import pandas as pd

# Load the main dataset
adherence = pd.read_csv('data/adherence_records.csv')

# Basic statistics
print("=" * 70)
print("MEDICATION ADHERENCE DATASET OVERVIEW")
print("=" * 70)
print(f"\nTotal patients: {len(adherence)}")
print(f"\nAdherence Statistics:")
print(f"  Adherent (≥80%): {(adherence['is_adherent']).sum()} patients")
print(f"  Non-adherent (<70%): {(adherence['is_non_adherent']).sum()} patients")
print(f"  Mean adherence score: {adherence['adherence_score'].mean():.1f}%")

print(f"\n\nTop 5 Causes of Non-Adherence:")
print(adherence['primary_non_adherence_cause'].value_counts().head())

print(f"\n\nAge Distribution:")
print(f"  Min age: {adherence['age'].min()}")
print(f"  Max age: {adherence['age'].max()}")
print(f"  Mean age: {adherence['age'].mean():.1f}")

print(f"\n\nMedication Complexity:")
print(adherence['medication_complexity'].value_counts())

print(f"\n\nIncome Level Distribution:")
print(adherence['income_level'].value_counts())

print(f"\n\nEducation Level:")
print(adherence['education_level'].value_counts())

print("\n" + "=" * 70)
print("✓ Data exploration complete!")
print("=" * 70)
