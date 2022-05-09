using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Content
    {
        public Content()
        {
            Courses = new HashSet<Course>();
        }

        public int ContentId { get; set; }
        public int? ContentTypeId { get; set; }
        public byte[] ContentUpload { get; set; }

        public virtual ContentType ContentType { get; set; }
        public virtual ICollection<Course> Courses { get; set; }
    }
}
