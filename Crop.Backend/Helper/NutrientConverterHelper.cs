namespace Crop.Backend.Helper
{
    public class NutrientConverterHelper
    {
        // Method to convert K2O to Potassium (K), P2O5 to Phosphorus (P), and Nitrogen percentage to kg/ha
        public static (float potassium, float phosphorus, float nitrogen) ConvertNutrients(
            string k2oKgHaStr, string p2o5KgHaStr, string nitrogenPercentageStr)
        {
            // Remove units from the input strings and parse them into floats
            float k2oKgHa = ParseValue(k2oKgHaStr); 
            float p2o5KgHa = ParseValue(p2o5KgHaStr);
            float nitrogenPercentage = ParsePercentage(nitrogenPercentageStr);

            // Conversion factor for K2O to K (Potassium)
            float kToK2O = 0.414f;

            // Conversion factor for P2O5 to P (Phosphorus)
            float pToP2O5 = 0.218f;

            // Convert K2O to Potassium (K) in kg/ha
            float potassium = k2oKgHa * kToK2O;

            // Convert P2O5 to Phosphorus (P) in kg/ha
            float phosphorus = p2o5KgHa * pToP2O5;

            float nitrogen = nitrogenPercentage * 1000;

            return (potassium, phosphorus, nitrogen);
        }

        private static float ParseValue(string input)
        {
            // Remove any non-numeric characters (such as 'kg/ha', '%', etc.) and parse the numeric value
            string numericValue = new string(input.Where(c => Char.IsDigit(c) || c == '.').ToArray());
            return float.Parse(numericValue);
        }

        // Helper method to parse percentage values like "0.12 %"
        private static float ParsePercentage(string input)
        {
            string numericValue = new string(input.Where(c => Char.IsDigit(c) || c == '.').ToArray());
            return float.Parse(numericValue) / 100;
        }
    }
}
