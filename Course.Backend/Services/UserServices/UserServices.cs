using Course.Backend.DBContext;
using Course.Backend.Helper;
using Course.Backend.Model;
using Course.Backend.Model.DTO;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace Course.Backend.Services.UserServices
{
    public class UserServices : IUserServices
    {
        private readonly DatabaseContext _db;
        private readonly IConfiguration _configuration;

        public UserServices(DatabaseContext db, IConfiguration configuration)
        {
            _db = db;
            _configuration = configuration;
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
        public async Task<string> Login(LoginRequestDTO loginRequestDTO)
        {
            try
            {
                var user = await _db.Users.Where(user => user.EmailAddress == loginRequestDTO.EmailAddress).FirstOrDefaultAsync();
                bool isPasswordCorrect = PasswordHashing.VerifyPassword(loginRequestDTO.Password, user.Password);
                if (user == null && !isPasswordCorrect)
                {
                    return "Invalid Email or Password";
                }
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration.GetValue<string>("JwtOptions:Secret"));
                var claims = new List<Claim>
            {
                new Claim("Email",user.Username.ToString()),
                new Claim("Username",user.EmailAddress.ToString()),
            };

                var audience = _configuration.GetValue<string>("JwtOptions:Audience");
                var issuer = _configuration.GetValue<string>("JwtOptions:Issuer");

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Audience =audience,
                    Issuer = issuer,
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)

                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);

            }
            catch(Exception ex)
            {
                return null;

            }


        }


     }
}
