using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class SectionContent
    {
        public SectionContent()
        {
            //Contents = new HashSet<Content>();
            //Quizzes = new HashSet<Quiz>();
        }

        public int SectionContentId { get; set; }
        public string SectionName { get; set; }
        public int? CourseId { get; set; }

        //Changes
        public string YoutubeLink { get; set; }
        public string YoutubeHeading { get; set; }
        public string ContentLink { get; set; }
        public string ContentHeading { get; set; }

        public virtual Course Course { get; set; }
        //public virtual ICollection<Content> Contents { get; set; }
        //public virtual ICollection<Quiz> Quizzes { get; set; }
    }
}
