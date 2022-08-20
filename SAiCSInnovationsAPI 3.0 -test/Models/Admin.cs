using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Admin
    {
        public Admin()
        {
            AuditTrails = new HashSet<AuditTrail>();
            Courses = new HashSet<Course>();
        }

        public int AdminId { get; set; }
        public string UserId { get; set; }
        public string Idnumber { get; set; }
        public string Iddocument { get; set; }
        public string ProofOfAddress { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<AuditTrail> AuditTrails { get; set; }
        public virtual ICollection<Course> Courses { get; set; }
    }
}
