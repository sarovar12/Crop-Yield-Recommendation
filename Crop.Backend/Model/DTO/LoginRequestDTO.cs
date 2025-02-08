namespace Crop.Backend.Model.DTO
{
    public class LoginRequestDTO
    {
        public string EmailAddress { get; set; }
        public string Password { get; set; }
    }

    public class DashboardResponse
    {
        public int Count { get; set; }
        public CropRecommendation MostRecentRecommendation { get; set; }
    }

}
