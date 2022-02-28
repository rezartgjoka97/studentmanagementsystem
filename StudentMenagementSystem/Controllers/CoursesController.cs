using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentMenagementSystem.Models;
using StudentMenagementSystem.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentMenagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseRepository _courseRepository;
        public CoursesController(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Course>> GetCourses()
        {
            return await _courseRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            return await _courseRepository.Get(id);
        }

        [HttpPost]
        public async Task<ActionResult<Student>> PostCourses([FromBody] Course course)
        {
            var newCourse = await _courseRepository.Create(course);
            return CreatedAtAction(nameof(GetCourse), new { id = newCourse.Id }, newCourse);
        }

    }
}
