using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class CourseStatus
    {
        public CourseStatus()
        {
            Courses = new HashSet<Course>();
        }

        public int CourseStatusId { get; set; }
        public string CourseStatusName { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Course> Courses { get; set; }
    }
}
