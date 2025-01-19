using System.ComponentModel.DataAnnotations;

namespace Course.Backend.Model
{
    public class User
    {
        [Key]
        [EmailAddress]
        public string EmailAddress { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Username {  get; set; }
    }
}
