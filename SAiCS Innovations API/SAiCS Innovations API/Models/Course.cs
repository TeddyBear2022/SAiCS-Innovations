using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Course
    {
        public Course()
        {
            Ambassadors = new HashSet<Ambassador>();
        }

        public int CourseId { get; set; }
        public int? AdminId { get; set; }
        public int? QuizId { get; set; }
        public int? ContentId { get; set; }
        public int? CourseStatusId { get; set; }
        public string CourseName { get; set; }

        public virtual Admin Admin { get; set; }
        public virtual Content Content { get; set; }
        public virtual CourseStatus CourseStatus { get; set; }
        public virtual Quiz Quiz { get; set; }
        public virtual ICollection<Ambassador> Ambassadors { get; set; }
    }
}
