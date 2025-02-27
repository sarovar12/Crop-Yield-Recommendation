﻿using Crop.Backend.Helper;
using Crop.Backend.Model;
using Crop.Backend.Model.DTO;
using Crop.Backend.Services.CropRecommendationServices;
using Crop.Backend.Services.NAARCApiService;
using Newtonsoft.Json;
using System.Text;

namespace Crop.Backend.Services.MLService
{
    public class MLService(INarcService narcService, ICropRecommendationServices cropRecommendationServices) : IMLServices
    {
        public async Task<CropRecommendationResponseModel> CropRecommendationService(CropRecommendationRequestDTO cropRecommendationRequestDTO)
        {
            //return await Task.Run(() =>
            //{
            //    // Initialize Python.NET
            //    //Environment.SetEnvironmentVariable("PYTHONNET_PYDLL", @"C:\Python311\DLLs\python38.dll");


            //    //try
            //    //{
            //    //    Runtime.PythonDLL = @"C:\Users\ASUS\AppData\Local\Programs\Python\Python313\python313.dll";
            //    //    PythonEngine.Initialize();
            //    //    using (Py.GIL())
            //    //    {
            //    //        // Load the Python script
            //    //        dynamic sys = Py.Import("sys");
            //    //        //dynamic pd = Py.Import("pandas");
            //    //        Console.WriteLine("Python version: " + sys.version);
            //    //        // Add the directory containing the Python script to sys.path
            //    //        sys.path.append(@"D:\ProjectsB\CropYieldRecommendation\Crop.Backend\Services\MLService");
            //    //        dynamic py = Py.Import("crop_recommendation");

            //    //        // Create a dictionary for input parameters
            //    //        var parameters = new PyDict
            //    //        {
            //    //            ["N"] = new PyFloat(cropRecommendationRequestDTO.Nitrogen),
            //    //            ["P"] = new PyFloat(cropRecommendationRequestDTO.Phosphorus),
            //    //            ["K"] = new PyFloat(cropRecommendationRequestDTO.Potassium),
            //    //            ["temperature"] = new PyFloat(cropRecommendationRequestDTO.Temperature),
            //    //            ["humidity"] = new PyFloat(cropRecommendationRequestDTO.Humidity),
            //    //            ["ph"] = new PyFloat(cropRecommendationRequestDTO.PhValue),
            //    //            ["rainfall"] = new PyFloat(cropRecommendationRequestDTO.Rainfall)
            //    //        };

            //    //        // Call the Python function recommend_crop
            //    //        dynamic recommendation = py.recommend_crop(parameters);

            //    //        // Prepare the result
            //    //        return new
            //    //        {
            //    //            RandomForestRecommendation = recommendation["Random Forest Recommendation"].ToString(),
            //    //            GradientBoostingRecommendation = recommendation["Gradient Boosting Recommendation"].ToString()
            //    //        };
            //    //    }
            //    //}
            //    //catch (Exception ex)
            //    //{
            //    //    throw new ArgumentException($"Error calling Python script: {ex.Message}");
            //    //}
            //});

            var url = "http://127.0.0.1:5000/predict";

            using (var client = new HttpClient())
            {
                try
                {

                    var requestData = new
                    {
                        N = cropRecommendationRequestDTO.Nitrogen,
                        P = cropRecommendationRequestDTO.Phosphorus,
                        K = cropRecommendationRequestDTO.Potassium,
                        temperature = cropRecommendationRequestDTO.Temperature,
                        humidity = cropRecommendationRequestDTO.Humidity,
                        ph = cropRecommendationRequestDTO.PhValue,
                        rainfall = cropRecommendationRequestDTO.Rainfall
                    };

                    var jsonRequest = JsonConvert.SerializeObject(requestData);
                    var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
                    // Send the GET request
                    var response = await client.PostAsync(url, content);
                    response.EnsureSuccessStatusCode();

                    var json = await response.Content.ReadAsStringAsync();
                    var soilDataResponse = JsonConvert.DeserializeObject<CropRecommendationResponseModel>(json);
                    return soilDataResponse;

                    //var result = JsonConvert.DeserializeObject<SoilDataResponseModel>(soilDataResponse.Result);

                }
                catch (Exception ex)
                {
                    throw new ArgumentException("An error occurred: " + ex.Message);
                }
            }
        }

        public async Task<dynamic> GetCropRecommendation(CropRecommendationRequestDTO cropRecommendationRequestDTO)
        {
            var result = await CropRecommendationService(cropRecommendationRequestDTO);
            var cropRecommendationModel = new CropRecommendation()
            {
                GradientBoostingRecommendation = "test",
                RandomForestRecommendation = result.recommended_crops_string,
                Humidity = cropRecommendationRequestDTO.Humidity,
                Rainfall = cropRecommendationRequestDTO.Rainfall,
                PhValue = cropRecommendationRequestDTO.PhValue,
                Temperature = cropRecommendationRequestDTO.Temperature,
                Potassium = cropRecommendationRequestDTO.Potassium,
                Phosphorus = cropRecommendationRequestDTO.Phosphorus,
                Nitrogen = cropRecommendationRequestDTO.Nitrogen,
            };
            await cropRecommendationServices.InsertCropRecommendation(cropRecommendationModel);
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
                Humidity = cropRecommendationRequestDTO.Humidity,
                Temperature = cropRecommendationRequestDTO.Temperature,
                Rainfall = cropRecommendationRequestDTO.Rainfall
            };

            var cropRecommendation = await CropRecommendationService(cropRecommendationRequest);
            var response = new CropRecommendationByLocationResponseDTO()
            {
                RandomForest = cropRecommendation.recommended_crops_string,
                GradientBoosting = "test",
                Nitrogen = soilContent.TotalNitrogen,
                Phosphorus = soilContent.P2O5,
                PhValue = soilContent.Ph,
                Potassium = soilContent.Potassium,
                Temperature = cropRecommendationRequestDTO.Temperature,
                Humidity = cropRecommendationRequestDTO.Humidity,
                Rainfall = cropRecommendationRequestDTO.Rainfall,
            };

            var cropRecommendationModel = new CropRecommendation()
            {
                Latitude = cropRecommendationRequestDTO.Latitude,
                Longitude = cropRecommendationRequestDTO.Longitude,
                GradientBoostingRecommendation = "test",
                RandomForestRecommendation = cropRecommendation.recommended_crops_string,
                Humidity = cropRecommendationRequest.Humidity,
                Rainfall = cropRecommendationRequest.Rainfall,
                PhValue = cropRecommendationRequest.PhValue,
                Temperature = cropRecommendationRequest.Temperature,
                Potassium = cropRecommendationRequest.Potassium,
                Phosphorus = cropRecommendationRequest.Phosphorus,
                Nitrogen = cropRecommendationRequest.Nitrogen,

            };
            await cropRecommendationServices.InsertCropRecommendation(cropRecommendationModel);
            return response;

        }
    }
}
