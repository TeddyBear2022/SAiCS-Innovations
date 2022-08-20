using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class ContentType
    {
        public ContentType()
        {
            Contents = new HashSet<Content>();
        }

        public int ContentTypeId { get; set; }
        public string ContentTypeName { get; set; }

        public virtual ICollection<Content> Contents { get; set; }
    }
}
