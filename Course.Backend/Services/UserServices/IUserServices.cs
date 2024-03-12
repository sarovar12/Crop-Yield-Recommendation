using Course.Backend.Model;
using Course.Backend.Model.DTO;

namespace Course.Backend.Services.UserServices
{
    public interface IUserServices
    {
        Task<string> Login(LoginRequestDTO loginRequestDTO);
        Task<bool> Register(User user);
    }
}
