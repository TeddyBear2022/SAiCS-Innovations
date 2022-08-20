﻿using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Content
    {
        public int ContentId { get; set; }
        //public int? ContentTypeId { get; set; }
        //public byte[] ContentUpload { get; set; }
        public int? SectionId { get; set; }

        //added
        public string YoutubeLink { get; set; }
        public string YoutubeHeading { get; set; }
        public string ContentLink { get; set; }
        public string ContentHeading { get; set; }

        //public virtual ContentType ContentType { get; set; }
        //public virtual Section Section { get; set; }
    }
}
