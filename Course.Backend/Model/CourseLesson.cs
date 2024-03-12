using System.ComponentModel.DataAnnotations;

namespace Course.Backend.Model
{
    public class CourseLesson
    {
        [Key]
        public int CourseId { get; set; }
        public string CourseName {  get; set; }
        public string CourseDescription { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
