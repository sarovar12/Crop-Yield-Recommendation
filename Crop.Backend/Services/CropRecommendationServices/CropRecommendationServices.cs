using AutoMapper;
using Crop.Backend.DBContext;
using Crop.Backend.Model;
using Microsoft.EntityFrameworkCore;

namespace Crop.Backend.Services.CropRecommendationServices
{
    public class CropRecommendationServices(DatabaseContext db) : ICropRecommendationServices
    {
        public async Task<List<CropRecommendation>> GetCropRecommendations()
        {
            return await db.CropRecommendations.ToListAsync();
        }

        public async Task<bool> InsertCropRecommendation(CropRecommendation cropRecommendation)
        {
            try
            {
                await db.AddAsync(cropRecommendation);
                await db.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }


        }
    }
}
