﻿using Crop.Backend.Model.DTO;

namespace Crop.Backend.Services.MLService;

public interface IMLServices
{
    Task<CropRecommendationResponseModel> CropRecommendationService(CropRecommendationRequestDTO cropRecommendationRequestDTO);
    Task<dynamic> GetCropRecommendation(CropRecommendationRequestDTO cropRecommendationRequestDTO);

    Task<CropRecommendationByLocationResponseDTO> GetCropRecommendationByLocation(CropRecommendationByLocationRequestDTO cropRecommendationRequestDTO);

}