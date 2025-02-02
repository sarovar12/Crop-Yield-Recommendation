using Crop.Backend.Helper;
using Crop.Backend.Model;
using Crop.Backend.Model.DTO;
using Crop.Backend.Services.NAARCApiService;
using Python.Runtime;
using System;

namespace Crop.Backend.Services.MLService
{
    public class MLService(INarcService narcService) : IMLServices
    {
        public async Task<dynamic> CropRecommendationService(CropRecommendationRequestDTO cropRecommendationRequestDTO)
        {
            return await Task.Run(() =>
            {
                // Initialize Python.NET
                //Environment.SetEnvironmentVariable("PYTHONNET_PYDLL", @"C:\Python311\DLLs\python38.dll");
                Runtime.PythonDLL = @"C:\Users\ASUS\AppData\Local\Programs\Python\Python313\python313.dll";
                PythonEngine.Initialize();

                try
                {
                    using (Py.GIL())
                    {
                        // Load the Python script
                        dynamic sys = Py.Import("sys");
                        //dynamic pd = Py.Import("pandas");
                        Console.WriteLine("Python version: " + sys.version);
                        // Add the directory containing the Python script to sys.path
                        sys.path.append(@"D:\ProjectsB\CropYieldRecommendation\Crop.Backend\Services\MLService");
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
                    throw new ArgumentException($"Error calling Python script: {ex.Message}");
                }

            });
        }

        public async Task<dynamic> GetCropRecommendation(CropRecommendationRequestDTO cropRecommendationRequestDTO)
        {
            var result = await CropRecommendationService(cropRecommendationRequestDTO);
            return result;
        }

        public async Task<CropRecommendationByLocationResponseDTO> GetCropRecommendationByLocation(CropRecommendationByLocationRequestDTO cropRecommendationRequestDTO)
        {
            var soilContentRequest = new SoilDataRequestModel()
            {
                Latitude = cropRecommendationRequestDTO.Latitude,
                Longitude = cropRecommendationRequestDTO.Longitude,
            };

            var soilContent = await narcService.NarcSoilContentService(soilContentRequest);

            var (potassium, phosphorus, nitrogen) = NutrientConverterHelper.ConvertNutrients(soilContent.Potassium, soilContent.P2O5, soilContent.TotalNitrogen);
            var cropRecommendationRequest = new CropRecommendationRequestDTO()
            {
                Nitrogen = nitrogen,
                Phosphorus = phosphorus,
                Potassium = potassium,
                PhValue = soilContent.Ph,
                Humidity = 60.0f,
                Temperature = 20.9f,
                Rainfall = 200.9f
            };

            var cropRecommendation = await CropRecommendationService(cropRecommendationRequest);
            var response = new CropRecommendationByLocationResponseDTO()
            {
                RandomForest =  cropRecommendation.RandomForestRecommendation,
                GradientBoosting = cropRecommendation.GradientBoostingRecommendation,
                Nitrogen = soilContent.TotalNitrogen,
                Phosphorus = soilContent.P2O5,
                PhValue = soilContent.Ph,
                Potassium = soilContent.Potassium
            };

            return response;

        }
    }
}
