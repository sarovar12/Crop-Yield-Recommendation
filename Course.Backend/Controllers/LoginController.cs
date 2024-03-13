using Course.Backend.Model;
using Course.Backend.Model.DTO;
using Course.Backend.Services.UserServices;
using Microsoft.AspNetCore.Mvc;
using static Course.Backend.Helper.Common;

namespace Course.Backend.Controllers
{
    [ApiController]

    public class LoginController : ControllerBase
    {
        private readonly IUserServices _userServices;
        public LoginController(IUserServices userServices)
        {
            _userServices = userServices;

        }
        [HttpPost]
        [Route("~/api/login")]
        public async Task<ActionResult> Login([FromBody] LoginRequestDTO loginRequestDTO)
        {
            var user = await _userServices.Login(loginRequestDTO);
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
            bool status = await _userServices.Register(user);
            if (status == false)
            {
                return NotFound();
            }
            else
            {
                return Ok("User Created Successfully, You can now login!!!");
            }

        }
    }
}
