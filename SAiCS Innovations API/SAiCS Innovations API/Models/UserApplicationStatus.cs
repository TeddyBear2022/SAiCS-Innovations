using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class UserApplicationStatus
    {
        public int UserApplicationStatusId { get; set; }
        public int? ApplicationStatusId { get; set; }
        public int? UserId { get; set; }

        public virtual ApplicationStatus ApplicationStatus { get; set; }
        public virtual User User { get; set; }
    }
}
