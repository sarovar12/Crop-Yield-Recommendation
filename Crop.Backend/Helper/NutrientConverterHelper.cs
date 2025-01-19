namespace Crop.Backend.Helper;

public class NutrientConverterHelper
{
    public static (double potassium, double phosphorus, double nitrogen) ConvertNutrients(double k2oKgHa, double p2o5KgHa, double nitrogenPercentage)
    {
        // Conversion factor for K2O to K (Potassium)
        double kToK2O = 0.414;

        // Conversion factor for P2O5 to P (Phosphorus)
        double pToP2O5 = 0.218;

        // Convert K2O to Potassium (K) in kg/ha
        double potassium = k2oKgHa * kToK2O;

        // Convert P2O5 to Phosphorus (P) in kg/ha
        double phosphorus = p2o5KgHa * pToP2O5;

        // Convert Nitrogen percentage to Nitrogen in kg/ha (multiply by 1000)
        double nitrogen = nitrogenPercentage * 1000;

        return (potassium, phosphorus, nitrogen);
    }
}
