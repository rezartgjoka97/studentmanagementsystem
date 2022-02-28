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
    public class SubscribedCoursesController: ControllerBase
    {
        private readonly ISubscribedCoursesRepository _subscribedCoursesRepository;
        public SubscribedCoursesController(ISubscribedCoursesRepository subscribedCoursesRepository)
        {
            _subscribedCoursesRepository = subscribedCoursesRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<SubscribedCourses>> GetCourses()
        {
            return await _subscribedCoursesRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SubscribedCourses>> GetCourse(int id)
        {
            return await _subscribedCoursesRepository.Get(id);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            var subCoursesToDelete = await _subscribedCoursesRepository.Get(id);

            if (subCoursesToDelete == null)
            {
                return NotFound();
            }

            await _subscribedCoursesRepository.Delete(id);
            return NoContent();

        }

        [HttpPost]
        public async Task<ActionResult<SubscribedCourses>> PostCourses([FromBody] SubscribedCourses subscribedCourses)
        {
            var newCourse = await _subscribedCoursesRepository.Create(subscribedCourses);
            return CreatedAtAction(nameof(GetCourse), new { id = newCourse.Id }, newCourse);
        }

        [Route("list/{id}")]
        [HttpGet]
        public GetCoursesResult GetCourseList(int id)
        {
            return _subscribedCoursesRepository.GetCourses(id);

        }

        [Route("updatesubcourses/{id}")]
        [HttpPost]
        public Task UpdateSubCourses(int id, [FromBody]List<SubscribedCourses> subscribedCourses)
        {
            return _subscribedCoursesRepository.UpdateSubCourses(id, subscribedCourses);

        }

        [Route("getnumberofsubs")]
        [HttpGet]
        public List<GetNumberOfSubcriptions> NumberOfSubcriptions()
        {
            return _subscribedCoursesRepository.NumberOfSubcriptions();
        }
    }
}
