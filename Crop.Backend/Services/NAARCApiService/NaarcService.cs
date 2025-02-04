using Crop.Backend.Model.DTO;
using Newtonsoft.Json;

namespace Crop.Backend.Services.NAARCApiService;

public interface INarcService
{
    Task<NarcResponseModel> NarcSoilContentService(SoilDataRequestModel soilDataRequestModel);
}

public class NarcService : INarcService

{
    public async Task<NarcResponseModel> NarcSoilContentService(SoilDataRequestModel soilDataRequestModel)
    {

        var url = $"https://soil.narc.gov.np/soil/soildata/?lon={soilDataRequestModel.Longitude}&lat={soilDataRequestModel.Latitude}";

        using (var client = new HttpClient())
        {
            try
            {

                // Send the GET request
                var response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();

                var json = await response.Content.ReadAsStringAsync();
                var soilDataResponse = JsonConvert.DeserializeObject<NarcResponseModel>(json);
                if (soilDataResponse is not null && soilDataResponse.Result is null)
                {
                    return soilDataResponse;
                }
                throw new ArgumentException("Request Error: " + soilDataResponse.Result);
                //var result = JsonConvert.DeserializeObject<SoilDataResponseModel>(soilDataResponse.Result);

            }
            catch (HttpRequestException ex)
            {
                return new NarcResponseModel
                {
                    Ph = 6.5f, 
                    Clay = "20%", 
                    OrganicMatter = "2.5%", 
                    TotalNitrogen = "0.1%",
                    Boron = "0.3 ppm",
                    P2O5 = "15 ppm",
                    Sand = "50%",
                    Zinc = "1.5 ppm",
                    Potassium = "150 ppm",
                };
                //throw new ArgumentException("Request error: " + ex.Message);
            }
            catch (Exception ex)
            {
                throw new ArgumentException("An error occurred: " + ex.Message);
            }
        }
    }
}
