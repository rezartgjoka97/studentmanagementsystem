using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentMenagementSystem.Models
{
    public class Student
    {
        public int Id { get; set; }

        public string NID { get; set; }

        public string Name { get; set; }

        public string SurName { get; set; }

        public double Grade { get; set; }

        public string Profession { get; set; }

        public string Education { get; set; }

        public string Password { get; set; }
 
    }
}
