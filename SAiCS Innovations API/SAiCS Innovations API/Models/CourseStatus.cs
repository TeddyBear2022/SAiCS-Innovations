using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class CourseStatus
    {
        public CourseStatus()
        {
            Certificates = new HashSet<Certificate>();
            Courses = new HashSet<Course>();
        }

        public int CourseStatusId { get; set; }
        public string CourseStatusName { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Certificate> Certificates { get; set; }
        public virtual ICollection<Course> Courses { get; set; }
    }
}
