using Course.Backend.Model;
using Course.Backend.Model.DTO;

namespace Course.Backend.Services.UserServices
{
    public interface IUserServices
    {
        Task<User> Login(string username, string password);
        Task<bool> Register(LoginRequestDTO loginRequestDTO);
    }
}
