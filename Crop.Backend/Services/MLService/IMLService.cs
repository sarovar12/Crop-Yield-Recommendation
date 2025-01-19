using Crop.Backend.Model.DTO;

namespace Crop.Backend.Services.MLService;

public interface IMLServices
{
    Task<dynamic> GetCropRecommendationAsync(CropRecommendationRequestDTO cropRecommendationRequestDTO);
}