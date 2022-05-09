using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Admin
    {
        public Admin()
        {
            AuditLogs = new HashSet<AuditLog>();
            Courses = new HashSet<Course>();
        }

        public int AdminId { get; set; }
        public int? UserId { get; set; }
        public string Idnumber { get; set; }
        public byte[] Idphoto { get; set; }
        public byte[] ProofOfAddressPhoto { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<AuditLog> AuditLogs { get; set; }
        public virtual ICollection<Course> Courses { get; set; }
    }
}
