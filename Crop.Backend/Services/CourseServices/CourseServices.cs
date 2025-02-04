//using AutoMapper;
//using Crop.Backend.DBContext;
//using Crop.Backend.Model;
//using Microsoft.EntityFrameworkCore;

//namespace Crop.Backend.Services.CourseServices
//{
//    public class CourseServices(DatabaseContext db, IMapper mapper) : ICourseServices
//    {
//        public async Task<bool> CreateCourse(CourseLesson course)
//        {
//            try
//            {
//                await db.AddAsync(course);
//                await db.SaveChangesAsync();
//                return true;
//            }
//            catch
//            {
//                return false;

//            }
//        }

//        public async Task<bool> DeleteCourse(int courseId)
//        {
//            try
//            {
//                var course = await db.Courses.Where(course => course.CourseId == courseId && course.IsDeleted == false).AsNoTracking().FirstOrDefaultAsync();
//                if (course == null)
//                {
//                    return false;
//                }
//                course.IsDeleted = true;
//                db.Courses.Update(course);
//                await db.SaveChangesAsync();
//                return true;


//            }
//            catch (Exception ex)
//            {
//                return false;
//            }
//        }

//        public async Task<CourseLesson?> GetCourseById(int courseId)
//        {
//            var course = await db.Courses.Where(course => course.CourseId == courseId && course.IsDeleted == false).FirstOrDefaultAsync();
//            if (course != null)
//            {
//                return course;
//            }
//            return null;
//        }

//        public async Task<List<CourseLesson>> GetCourses()
//        {
//            return await db.Courses.Where(course => course.IsDeleted == false).ToListAsync();

//        }

//        public async Task<bool> UpdateCourse(CourseLesson course, int courseId)
//        {
//            try
//            {
//                var courseById = await db.Courses.Where(course => course.CourseId == courseId && course.IsDeleted == false).AsNoTracking().FirstOrDefaultAsync();
//                if (course == null || courseById == null)
//                {
//                    return false;
//                }
//                db.Courses.Update(course);
//                await db.SaveChangesAsync();
//                return true;


//            }
//            catch (Exception ex)
//            {
//                return false;
//            }
//        }
//    }
//}
