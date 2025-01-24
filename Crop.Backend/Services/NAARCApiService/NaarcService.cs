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
                throw new ArgumentException("Request error: " + ex.Message);
            }
            catch (Exception ex)
            {
                throw new ArgumentException("An error occurred: " + ex.Message);
            }
        }
    }
}
