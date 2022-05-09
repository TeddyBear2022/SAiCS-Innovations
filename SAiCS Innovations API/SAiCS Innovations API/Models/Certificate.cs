using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Certificate
    {
        public int CertificateId { get; set; }
        public string CertificateDescription { get; set; }
        public string CertificateName { get; set; }
        public int? CourseStatusId { get; set; }

        public virtual CourseStatus CourseStatus { get; set; }
    }
}
