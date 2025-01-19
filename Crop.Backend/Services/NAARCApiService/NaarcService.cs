using Crop.Backend.Model.DTO;
using Newtonsoft.Json;

namespace Crop.Backend.Services.NAARCApiService;

public interface INarcService
{
    Task<SoilDataResponseModel> NarcSoilContentService(SoilDataRequestModel soilDataRequestModel);
}

public class NarcService : INarcService

{
    public async Task<SoilDataResponseModel> NarcSoilContentService(SoilDataRequestModel soilDataRequestModel)
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
                var soilDataResponse = JsonConvert.DeserializeObject<SoilDataResponseModel>(json);

                return soilDataResponse;
            }
            catch (HttpRequestException ex)
            {
                throw new Exception("Request error: " + ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred: " + ex.Message);
            }
        }
    }
}
