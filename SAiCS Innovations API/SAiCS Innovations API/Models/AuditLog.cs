using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class AuditLog
    {
        public int AuditTrailId { get; set; }
        public int AdminId { get; set; }
        public int AmbassadorId { get; set; }
        public string AuditLogDescription { get; set; }
        public DateTime AuditLogDatestamp { get; set; }
        public byte[] AuditLogTimestamp { get; set; }

        public virtual Admin Admin { get; set; }
        public virtual Ambassador Ambassador { get; set; }
    }
}
