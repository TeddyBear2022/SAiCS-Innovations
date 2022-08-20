using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Course
    {
        public Course()
        {
            AmbassadorEnrollments = new HashSet<AmbassadorEnrollment>();
            Sections = new HashSet<Section>();
        }

        public int CourseId { get; set; }
        public int? AdminId { get; set; }
        public int? CourseStatusId { get; set; }
        public string CourseName { get; set; }
        public string Description { get; set; }

        public virtual Admin Admin { get; set; }
        public virtual CourseStatus CourseStatus { get; set; }
        public virtual ICollection<AmbassadorEnrollment> AmbassadorEnrollments { get; set; }
        public virtual ICollection<Section> Sections { get; set; }
    }
}
