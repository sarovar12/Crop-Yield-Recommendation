using Crop.Backend.Model;
using Crop.Backend.Model.DTO;
using Crop.Backend.Services.CropRecommendationServices;
using Crop.Backend.Services.MLService;
using Crop.Backend.Services.UserServices;
using Microsoft.AspNetCore.Mvc;
using static Crop.Backend.Helper.Common;

namespace Crop.Backend.Controllers
{
    [ApiController]

    public class LoginController(IUserServices userServices, ICropRecommendationServices cropRecommendationServices) : ControllerBase
    {
        [HttpPost]
        [Route("~/api/login")]
        public async Task<ActionResult> Login([FromBody] LoginRequestDTO loginRequestDTO)
        {
            var user = await userServices.Login(loginRequestDTO);
            var serviceResult = new ServiceResult();
            if (user.Succeed == false)
            {
                serviceResult.Error = user.Error;
                serviceResult.Data = null;
                serviceResult.Succeed = false;
                return Ok(serviceResult);
            }
            else
            {
                serviceResult.Data = user.Data;
                return Ok(user);
            }

        }

        [HttpPost]
        [Route("~/api/register")]
        public async Task<ActionResult> Register(User user)
        {
            bool status = await userServices.Register(user);
            if (status == false)
            {
                return NotFound();
            }
            else
            {
                return Ok("User Created Successfully, You can now login!!!");
            }

        }

        [HttpGet]
        [Route("~/api/ml/dashboard")]
        public async Task<ActionResult<DashboardResponse>> DashBoard()
        {
            var list = await cropRecommendationServices.GetDashboard();
            var sarovar = new DashboardResponse()
            {
                Count = list.count,
                MostRecentRecommendation = list.mostRecentRecommendation
            };
            return Ok(sarovar);
        }
    }
}
