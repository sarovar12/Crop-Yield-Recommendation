using Crop.Backend.Model.DTO;
using Python.Runtime;

namespace Crop.Backend.Services.MLService
{
    public class MLService : IMLServices
    {
        public async Task<dynamic> GetCropRecommendationAsync(CropRecommendationRequestDTO cropRecommendationRequestDTO)
        {
            return await Task.Run(() =>
            {
                // Initialize Python.NET
                PythonEngine.Initialize();

                try
                {
                    using (Py.GIL())
                    {
                        // Load the Python script
                        dynamic py = Py.Import("crop_recommendation");

                        // Create a dictionary for input parameters
                        var parameters = new PyDict
                        {
                            ["N"] = new PyFloat(cropRecommendationRequestDTO.Nitrogen),
                            ["P"] = new PyFloat(cropRecommendationRequestDTO.Phosphorus),
                            ["K"] = new PyFloat(cropRecommendationRequestDTO.Potassium),
                            ["temperature"] = new PyFloat(cropRecommendationRequestDTO.Temperature),
                            ["humidity"] = new PyFloat(cropRecommendationRequestDTO.Humidity),
                            ["ph"] = new PyFloat(cropRecommendationRequestDTO.PhValue),
                            ["rainfall"] = new PyFloat(cropRecommendationRequestDTO.Rainfall)
                        };

                        // Call the Python function recommend_crop
                        dynamic recommendation = py.recommend_crop(parameters);

                        // Prepare the result
                        return new
                        {
                            RandomForestRecommendation = recommendation["Random Forest Recommendation"].ToString(),
                            GradientBoostingRecommendation = recommendation["Gradient Boosting Recommendation"].ToString()
                        };
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error calling Python script: {ex.Message}");
                }
                finally
                {
                    PythonEngine.Shutdown();
                }
            });
        }
    }
}
