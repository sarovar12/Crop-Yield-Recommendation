import pandas as pd
from sklearn.impute import SimpleImputer

# Load the crop data
cereal_data_path = r'D:\ProjectsB\Course_SursaAssesment\Data\NepalAgriStats_Cereal.csv'
cash_crop_data_path = r'D:\ProjectsB\Course_SursaAssesment\Data\NepalAgriStats_CashCrop.csv'

cereal_data = pd.read_csv(cereal_data_path)
cash_crop_data = pd.read_csv(cash_crop_data_path)

# Display the first few rows of each dataframe
print("Cereal Data:")
print(cereal_data.head())
print("\nCash Crop Data:")
print(cash_crop_data.head())

# Merge the dataframes on a common column (e.g., 'DISTRICT_CODE')
combined_data = pd.merge(cereal_data, cash_crop_data, on=['DISTRICT_CODE', 'DISTRICT_NAME'], how='outer')

# Display the first few rows of the combined dataframe
print("\nCombined Data:")
print(combined_data.head())

# Replace special values (e.g., '#VALUE!') with NaN
combined_data.replace('#VALUE!', pd.NA, inplace=True)

# Convert numeric columns explicitly, coercing errors to NaN
for col in combined_data.columns:
    if combined_data[col].dtype == 'object':
        # Attempt to convert text columns to numeric, with errors coerced to NaN
        combined_data[col] = pd.to_numeric(combined_data[col], errors='coerce')

# Select numeric columns
numeric_columns = combined_data.select_dtypes(include=['number']).columns

# Exclude columns with all missing values
numeric_data = combined_data[numeric_columns]
non_empty_columns = numeric_data.loc[:, numeric_data.notna().any()].columns

# Initialize the imputer for mean strategy
mean_imputer = SimpleImputer(strategy='mean')

# Apply the imputer only to non-empty columns
imputed_data = mean_imputer.fit_transform(numeric_data[non_empty_columns])

# Reconstruct the DataFrame with imputed values
numeric_data[non_empty_columns] = imputed_data

# Update the combined DataFrame with imputed numeric data
combined_data[numeric_columns] = numeric_data

# Check for any remaining missing values
print("\nMissing values after imputation:")
print(combined_data.isna().sum())

# Save the combined and cleaned data to a new CSV file
output_path = r'D:\ProjectsB\Course_SursaAssesment\Data\Combined_Cleaned_Data.csv'
combined_data.to_csv(output_path, index=False)
print(f"Combined and cleaned data saved to '{output_path}'")
