using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Section
    {
        public Section()
        {
            Contents = new HashSet<Content>();
            Quizzes = new HashSet<Quiz>();
        }

        public int SectionId { get; set; }
        public string SectionName { get; set; }
        public int? CourseId { get; set; }

        public virtual Course Course { get; set; }
        public virtual ICollection<Content> Contents { get; set; }
        public virtual ICollection<Quiz> Quizzes { get; set; }
    }
}
