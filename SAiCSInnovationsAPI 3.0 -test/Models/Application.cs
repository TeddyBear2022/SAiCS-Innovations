using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Application
    {
        public int ApplicationId { get; set; }
        public int? ApplicationStatusId { get; set; }
        public string UserId { get; set; }
        public DateTime? Date { get; set; }

        public virtual ApplicationStatus ApplicationStatus { get; set; }
        public virtual User User { get; set; }
    }
}
