using StudentMenagementSystem.Controllers;
using StudentMenagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentMenagementSystem.Repositories
{
    public interface IStudentRepository
    {
        Task<IEnumerable<Student>> Get();

        Task<Student> Get(int id);

        Task<Student> Create(Student student);

        Task Update(Student student);
        SuccesfulResult Delete(int id);

       SuccesfulResult CheckCredentials(Student student);
    }
}
