using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class ApplicationStatus
    {
        public ApplicationStatus()
        {
            UserApplicationStatuses = new HashSet<UserApplicationStatus>();
        }

        public int ApplicationStatusId { get; set; }
        public string StatusName { get; set; }

        public virtual ICollection<UserApplicationStatus> UserApplicationStatuses { get; set; }
    }
}
