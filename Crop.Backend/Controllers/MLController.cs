using Crop.Backend.Helper;
using Crop.Backend.Model.DTO;
using Crop.Backend.Services.CropRecommendationServices;
using Crop.Backend.Services.MLService;
using Crop.Backend.Services.NAARCApiService;
using Microsoft.AspNetCore.Mvc;

namespace Crop.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MLController(IMLServices mlServices, INarcService narcService, ICropRecommendationServices cropRecommendationServices) : ControllerBase
    {
        [HttpPost]
        [Route("getRecommendation")]
        public async Task<ActionResult> GetCropRecommendation(CropRecommendationRequestDTO cropRecommendationServiceDTO)
        {
            var result = await mlServices.GetCropRecommendation(cropRecommendationServiceDTO);
            return Ok(result);
        }

        [HttpPost]
        [Route("test/getRecommendation")]
        public async Task<ActionResult> TestRecommendation(SoilDataRequestModel request)
        {
            var soilResponse = await narcService.NarcSoilContentService(request);
            var (potassium, phosphorus, nitrogen) = NutrientConverterHelper.ConvertNutrients(soilResponse.Potassium,
                soilResponse.P2O5, soilResponse.TotalNitrogen);

            var response = new SoilParametersByLocation()
            {
                Nitrogen = nitrogen,
                Phosphorus = phosphorus,
                Potassium = potassium,
            };
            return Ok(response);
        }

        [HttpPost]
        [Route("getRecommendationByLocation")]
        public async Task<ActionResult> RecommendationByLocation(CropRecommendationByLocationRequestDTO request)
        {
            var testModel = new CropRecommendationByLocationRequestDTO()
            {

                Latitude = request.Latitude,
                Longitude = request.Longitude
            };
            var result = await mlServices.GetCropRecommendationByLocation(testModel);
            return Ok(result);
        }

        [HttpGet]
        [Route("getRecommendation")]
        public async Task<ActionResult> GetCropRecommendations()
        {
            try
            {
                var cropRecommendations = await cropRecommendationServices.GetCropRecommendations();
                return Ok(cropRecommendations);
            }
            catch
            {
                return BadRequest("Could not process request");
            }
        }

    }
}
