using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentMenagementSystem.Models
{
    public class SubscribedCourses
    {
        public int Id { get; set; }

        public int StudentId { get; set; }

        public int CourseId { get; set; }

        public bool subscribed { get; set; }

        public string OtherInfo { get; set; }

        public DateTime SubscribeDate { get; set; }
    }
}
