using Microsoft.EntityFrameworkCore;
using StudentMenagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentMenagementSystem.Repositories
{
    public class SubscribedCoursesRepository : ISubscribedCoursesRepository
    {
        private readonly StudentContext _context;

        public SubscribedCoursesRepository(StudentContext context)
        {
            _context = context;
        }
        public async Task<SubscribedCourses> Create(SubscribedCourses subscribedCourses)
        {
            _context.SubscribedCourses.Add(subscribedCourses);
            await _context.SaveChangesAsync();
            return subscribedCourses;
        }

        public async Task Delete(int id)
        {
            var subscibedCourseToDelete = await _context.SubscribedCourses.FindAsync(id);
            _context.SubscribedCourses.Remove(subscibedCourseToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<SubscribedCourses>> Get()
        {
            return await _context.SubscribedCourses.ToListAsync();
        }

        public async Task<SubscribedCourses> Get(int id)
        {
            return await _context.SubscribedCourses.FindAsync(id);
        }

        public async Task Update(SubscribedCourses subscribedCourses)
        {
            _context.Entry(subscribedCourses).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public GetCoursesResult GetCourses(int id)
        {
            List<SubscribedCourses> subscribedCoursesList = new List<SubscribedCourses>();
            try
            {
                if(_context!=null && _context.SubscribedCourses != null)
                {
                    subscribedCoursesList = _context.SubscribedCourses.Where((subscribedCourse) => subscribedCourse.StudentId == id).ToList();
                }
                return new GetCoursesResult() { result = subscribedCoursesList };
            }
            catch (NullReferenceException e)
            {
                return new GetCoursesResult() { result = subscribedCoursesList };
            }
        }

        public async Task UpdateSubCourses(int id,List<SubscribedCourses> subscrCourses)
        {
            List<SubscribedCourses> subCourses = new List<SubscribedCourses>();
            if (_context != null && _context.SubscribedCourses != null)
            {
                subCourses = _context.SubscribedCourses.Where((subscribedCourse) => subscribedCourse.StudentId == id).ToList();
            }
            List<SubscribedCourses> subCoursesToCreate = new List<SubscribedCourses>();
            List<SubscribedCourses> subCoursesToUpdate = new List<SubscribedCourses>();
            if (subscrCourses.Count > 0)
            {
                if (subCourses.Count > 0)
                {

                    subscrCourses.ForEach(subCourse =>
                    {
                        var subC = subCourses.Find(x => x.CourseId == subCourse.CourseId);
                        if (subC != null)
                        {
                            subCourse.Id = subC.Id;
                            subCoursesToUpdate.Add(subCourse);
                        }
                        else
                        {
                            subCoursesToCreate.Add(subCourse);
                        }
                    });
                    if (subCoursesToCreate.Count > 0)
                    {
                        _context.SubscribedCourses.AddRange(subCoursesToCreate);
                    }
                    if (subCoursesToUpdate.Count > 0)
                    {
                        subCourses.ForEach(x =>
                        {
                            Task p= Delete(x.Id);
                            x.Id = 0;
                        });
                        
                        _context.SubscribedCourses.AddRange(subCoursesToUpdate);
                    }
                }
                else
                {
                    _context.SubscribedCourses.AddRange(subscrCourses);
                }
            }
            await _context.SaveChangesAsync();
        }

        public List<GetNumberOfSubcriptions> NumberOfSubcriptions()
        {
            List<GetNumberOfSubcriptions> numberOfSubs = new List<GetNumberOfSubcriptions>();
            List<Student> stu = _context.Students.ToList();
            stu.ForEach(st =>
            {
                List<SubscribedCourses> subs = _context.SubscribedCourses.Where((sc) => sc.StudentId == st.Id).ToList();
                GetNumberOfSubcriptions subsObj = new GetNumberOfSubcriptions();
                subsObj.stdId = st.Id;
                int numberSub = 0;
                subs.ForEach(s =>
                {
                    if (s.subscribed)
                    {
                        numberSub++;
                    }
                });
                subsObj.subsNumber = numberSub;
                numberOfSubs.Add(subsObj);
            });
            return numberOfSubs;
        }

    }
    public class GetCoursesResult
    {
        public List<SubscribedCourses> result { get; set; }
    }

    public class GetNumberOfSubcriptions
    {
        public int stdId { get; set; }

        public int subsNumber { get; set; }

    }
}
