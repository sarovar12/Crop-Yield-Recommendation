using Crop.Backend.Model;
using Microsoft.EntityFrameworkCore;

namespace Crop.Backend.DBContext
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<CourseLesson> Courses { get; set; }


    }
}
