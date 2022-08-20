using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Certificate
    {
        public int CertificateId { get; set; }
        public string CertificateDescription { get; set; }
        public string CertificateName { get; set; }
        public int? AmbassadorId { get; set; }

        public virtual Ambassador Ambassador { get; set; }
    }
}
