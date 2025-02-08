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

        public async Task<(int count, CropRecommendation mostRecentRecommendation)> GetDashboard()
        {
            try
            {
                int count = await db.CropRecommendations.CountAsync();
                var mostRecentRecommendation = await db.CropRecommendations
                    .OrderByDescending(r => r.Id)  // Ensure you're ordering by the date property
                    .FirstOrDefaultAsync();

                return (count, mostRecentRecommendation);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return (0, null);  // Return default values if an exception occurs
            }
        }



    }
}
