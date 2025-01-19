
using Course.Backend.Model;
using Course.Backend.Model.DTO;
using static Course.Backend.Helper.Common;

namespace Course.Backend.Services.UserServices
{
    public interface IUserServices
    {
        Task<ServiceResult> Login(LoginRequestDTO loginRequestDTO);
        Task<bool> Register(User user);
    }
}
