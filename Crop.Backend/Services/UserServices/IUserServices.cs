using Crop.Backend.Model;
using Crop.Backend.Model.DTO;
using static Crop.Backend.Helper.Common;

namespace Crop.Backend.Services.UserServices
{
    public interface IUserServices
    {
        Task<ServiceResult> Login(LoginRequestDTO loginRequestDTO);
        Task<bool> Register(User user);
    }
}
