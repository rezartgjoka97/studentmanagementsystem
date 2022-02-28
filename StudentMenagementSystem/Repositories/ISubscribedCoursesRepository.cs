using StudentMenagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentMenagementSystem.Repositories
{
    public interface ISubscribedCoursesRepository
    {
        Task<IEnumerable<SubscribedCourses>> Get();

        Task<SubscribedCourses> Get(int id);

        Task<SubscribedCourses> Create(SubscribedCourses subscribedCourses);

        Task Update(SubscribedCourses subscribedCourses);
        Task Delete(int id);
        GetCoursesResult GetCourses(int id);

        Task UpdateSubCourses(int id, List<SubscribedCourses> subscribedCourses);

        List<GetNumberOfSubcriptions> NumberOfSubcriptions();

    }
}
