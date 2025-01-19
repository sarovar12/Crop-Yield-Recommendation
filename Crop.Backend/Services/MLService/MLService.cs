using Crop.Backend.Helper;
using Crop.Backend.Model.DTO;
using Crop.Backend.Services.NAARCApiService;
using Python.Runtime;

namespace Crop.Backend.Services.MLService
{
    public class MLService(INarcService narcService) : IMLServices
    {
        public async Task<dynamic> CropRecommendationService(CropRecommendationRequestDTO cropRecommendationRequestDTO)
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

        public Task<dynamic> GetCropRecommendation(CropRecommendationRequestDTO cropRecommendationRequestDTO)
        {

            throw new NotImplementedException();
        }

        public async Task<CropRecommendationByLocationResponseDTO> GetCropRecommendationByLocation(CropRecommendationByLocationRequestDTO cropRecommendationRequestDTO)
        {
            var soilContentRequest = new SoilDataRequestModel()
            {
                Latitude = cropRecommendationRequestDTO.Latitude,
                Longitude = cropRecommendationRequestDTO.Longitude,
            };

            var soilContent = await narcService.NarcSoilContentService(soilContentRequest);

            var mappedSoilContentData = NutrientConverterHelper.ConvertNutrients(soilContent.Potassium, soilContent.P2O5, soilContent.TotalNitrogen);
            var cropRecommendationRequest = new CropRecommendationRequestDTO()
            {
                Nitrogen = mappedSoilContentData.nitrogen,
                Phosphorus = mappedSoilContentData.phosphorus,
                Potassium = mappedSoilContentData.phosphorus,
                PhValue = soilContent.Ph,
            };

            var cropRecommendation = await CropRecommendationService(cropRecommendationRequest);
            var response = new CropRecommendationByLocationResponseDTO()
            {
                RecommendationMessage = cropRecommendation.RandomForestRecommendation,
                Nitrogen = soilContent.TotalNitrogen,
                Phosphorus = soilContent.P2O5
            };

            return response;

            throw new NotImplementedException();
        }
    }
}
