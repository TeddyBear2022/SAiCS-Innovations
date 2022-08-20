using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class ApplicationStatus
    {
        public ApplicationStatus()
        {
            Applications = new HashSet<Application>();
        }

        public int ApplicationStatusId { get; set; }
        public string StatusName { get; set; }

        public virtual ICollection<Application> Applications { get; set; }
    }
}
