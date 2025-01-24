using Crop.Backend.Model;
using Crop.Backend.Model.DTO;
using Crop.Backend.Services.MLService;
using Microsoft.AspNetCore.Mvc;

namespace Crop.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MLController(IMLServices mlServices) : ControllerBase
    {
        [HttpPost]
        [Route("~/getRecommendation")]
        public async Task<ActionResult> GetCropRecommendation(CropRecommendationRequestDTO cropRecommendationServiceDTO)
        {
            var result = await mlServices.GetCropRecommendation(cropRecommendationServiceDTO);
            return Ok(result);
        }

        [HttpGet]
        [Route("~/test/getRecommendation")]
        public async Task<ActionResult> TestRecommendation()
        {
            var testModel = new CropRecommendationByLocationRequestDTO()
            {

                Latitude = 26.626f,
                Longitude = 87.873f
            };
            var result = await mlServices.GetCropRecommendationByLocation(testModel);
            return Ok(result);
        }

    }
}
