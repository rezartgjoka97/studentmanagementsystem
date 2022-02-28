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
    public class StudentsController : ControllerBase
    {
        private readonly IStudentRepository _studentRepository;
        public StudentsController(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Student>> GetStudents()
        {
            return await _studentRepository.Get();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            return await _studentRepository.Get(id);
        }


        [HttpPost]
        public async Task<ActionResult<Student>> PostStudents([FromBody]Student student)
        {
            var newStudent = await _studentRepository.Create(student);
            return CreatedAtAction(nameof(GetStudent), new { id = newStudent.Id }, newStudent);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStudent(int id, [FromBody]Student student)
        {
            if(id != student.Id)
            {
                return BadRequest();
            }

            await _studentRepository.Update(student);

            return NoContent();
        }

        [Route("login")]
        [HttpPost]
        public SuccesfulResult CheckCredetials([FromBody] Student student)
        {
            return _studentRepository.CheckCredentials(student);

        }

        [HttpDelete("{id}")]
        public SuccesfulResult Delete(int id)
        {
            var studentToDelete =  _studentRepository.Get(id);

            if(studentToDelete == null)
            {
                return new SuccesfulResult() { result=false};
            }

            return _studentRepository.Delete(id); 

        }

    }

    public class UpdateStudent
    {
        public Student student { get; set; }

        public List<SubscribedCourses> subscribedCourses { get; set; }
    }

}
