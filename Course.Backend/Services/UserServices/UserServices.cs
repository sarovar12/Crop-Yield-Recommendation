using Course.Backend.DBContext;
using Course.Backend.Helper;
using Course.Backend.Model;
using Course.Backend.Model.DTO;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;


namespace Course.Backend.Services.UserServices
{
    public class UserServices : IUserServices
    {
        private readonly DatabaseContext _db;
        public UserServices(DatabaseContext db)
        {
            _db = db;       
        }

        public async Task<bool> Register(User user)
        {
            try
            {
                var hashedPassword = PasswordHashing.HashPassword(user.Password);
                user.Password = hashedPassword;
                await _db.AddAsync(user);
                await _db.SaveChangesAsync();
                return true;

            }
            catch(Exception ex) 
            {
                return false;
            }
 
        }
        public async Task<User> Login(LoginRequestDTO loginRequestDTO)
        {
            try
            {
                var user = await _db.Users.Where(user => user.EmailAddress == loginRequestDTO.EmailAddress).FirstOrDefaultAsync();
                bool isPasswordCorrect = PasswordHashing.VerifyPassword(user.Password, loginRequestDTO.Password);
                if (user == null && !isPasswordCorrect)
                {
                    return null;
                }
                return user;

            }
            catch(Exception ex)
            {
                return null;

            }
        }


     }
}
