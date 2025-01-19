using AutoMapper;
using Course.Backend.DBContext;
using Course.Backend.Model;
using Microsoft.EntityFrameworkCore;

namespace Course.Backend.Services.CourseServices
{
    public class CourseServices : ICourseServices
    {
        private readonly DatabaseContext _db;
        private readonly IMapper _mapper;

        public CourseServices(DatabaseContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;

        }

        public async Task<bool> CreateCourse(CourseLesson course)
        {
            try
            {
                await _db.AddAsync(course);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;

            }
        }

        public async Task<bool> DeleteCourse(int courseId)
        {
            try
            {
                var course = await _db.Courses.Where(course => course.CourseId == courseId && course.IsDeleted == false).AsNoTracking().FirstOrDefaultAsync();
                if (course == null)
                {
                    return false;
                }
                course.IsDeleted = true;
                _db.Courses.Update(course);
                await _db.SaveChangesAsync();
                return true;


            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<CourseLesson?> GetCourseById(int courseId)
        {
           var course = await _db.Courses.Where(course=>course.CourseId == courseId && course.IsDeleted == false).FirstOrDefaultAsync();
           if(course != null)
            {
                return course;
            }
           return null;
        }

        public async Task<List<CourseLesson>> GetCourses()
        {
            return await _db.Courses.Where(course => course.IsDeleted == false).ToListAsync();
            
        }

        public async Task<bool> UpdateCourse(CourseLesson course, int courseId)
        {
            try
            {
                var courseById = await _db.Courses.Where(course => course.CourseId == courseId && course.IsDeleted == false).AsNoTracking().FirstOrDefaultAsync();
                if (course == null || courseById == null)
                {
                    return false;
                }
                _db.Courses.Update(course);
                await _db.SaveChangesAsync();
                return true;


            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
