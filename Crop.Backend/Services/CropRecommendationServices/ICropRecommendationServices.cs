using Crop.Backend.Model;

namespace Crop.Backend.Services.CropRecommendationServices
{
    public interface ICropRecommendationServices
    {
        Task<List<CropRecommendation>> GetCropRecommendations();
        Task<bool> InsertCropRecommendation(CropRecommendation cropRecommendation);
    }
}
