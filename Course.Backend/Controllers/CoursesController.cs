using Course.Backend.Model;
using Course.Backend.Services.CourseServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Course.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseServices _courseServices;
        public CoursesController(ICourseServices courseServices)
        {
            _courseServices = courseServices;
            
        }

        [HttpGet]
        public async Task<ActionResult> GetAllCourses()
        {
            try
            {
                var course = await _courseServices.GetCourses();
                return Ok(course);
            }
            catch
            {
                return BadRequest("Could not process request");
            }
 
        }

        [HttpGet]
        [Route("{courseId}")]
        public async Task<ActionResult> GetAllCourseById([FromRoute] int courseId)
        {
            try
            {
                var course = await _courseServices.GetCourseById(courseId);
                if(course == null)
                {
                    return NotFound("Course could not be found");
                }
                return Ok(course);
            }
            catch
            {
                return BadRequest("Could not process request");
            }

        }


        [HttpPost]
        public async Task<ActionResult> AddCourse([FromBody] CourseLesson courseLesson)
        {
            try
            {
                bool course = await _courseServices.CreateCourse(courseLesson);
                if (course == false)
                {
                    return BadRequest("Course could not be created");
                }
                return Ok("Course Created Successfully!!!");
            }
            catch
            {
                return BadRequest("Could not process request");
            }

        }

        [HttpPut]
        [Route("{courseId}")]
        public async Task<ActionResult> UpdateCourse([FromBody] CourseLesson courseLesson, [FromRoute] int courseId)
        {
            try
            {
                bool course = await _courseServices.UpdateCourse(courseLesson,courseId);
                if (course == false)
                {
                    return BadRequest("Course could not be updated");
                }
                return Ok("Course Updated Successfully!!!");
            }
            catch
            {
                return BadRequest("Could not process request");
            }

        }

        [HttpDelete]
        [Route("{courseId}")]
        public async Task<ActionResult> DeleteCourse([FromRoute] int courseId)
        {
            try
            {
                bool course = await _courseServices.DeleteCourse(courseId);
                if (course == false)
                {
                    return BadRequest("Course could not be deleted");
                }
                return Ok("Course Deleted Successfully!!!");
            }
            catch
            {
                return BadRequest("Could not process request");
            }

        }

    }
}
