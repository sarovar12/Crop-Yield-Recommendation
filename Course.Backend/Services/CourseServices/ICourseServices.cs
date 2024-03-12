using Course.Backend.Model;

namespace Course.Backend.Services.CourseServices
{
    public interface ICourseServices
    {
        Task<List<CourseLesson>> GetCourses();
        Task<CourseLesson?> GetCourseById(int courseId);
        Task<bool> CreateCourse(CourseLesson course);
        Task<bool> DeleteCourse(int courseId);
        Task<bool> UpdateCourse(CourseLesson course,int courseId);
    }
}
