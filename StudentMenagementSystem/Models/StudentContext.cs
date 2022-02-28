using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentMenagementSystem.Models
{
    public class StudentContext: DbContext
    {

        public StudentContext(DbContextOptions<StudentContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Student> Students { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<SubscribedCourses> SubscribedCourses { get; set; }


    }
}
