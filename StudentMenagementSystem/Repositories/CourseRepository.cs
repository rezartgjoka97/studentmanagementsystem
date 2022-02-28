using Microsoft.EntityFrameworkCore;
using StudentMenagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentMenagementSystem.Repositories
{
    public class CourseRepository : ICourseRepository
    {

        private readonly StudentContext _context;

        public CourseRepository(StudentContext context)
        {
            _context = context;
        }

        public async Task<Course> Create(Course course)
        {
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return course;
        }

        public async Task Delete(int id)
        {
            var courseToDelete = await _context.Courses.FindAsync(id);
            _context.Courses.Remove(courseToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Course>> Get()
        {
            return await _context.Courses.ToListAsync();
        }

        public async Task<Course> Get(int id)
        {
            return await _context.Courses.FindAsync(id);
        }

        public async Task Update(Course course)
        {
            _context.Entry(course).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

    }

}
