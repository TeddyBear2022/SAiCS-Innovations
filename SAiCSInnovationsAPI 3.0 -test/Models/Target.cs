using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Target
    {
        public int TargetId { get; set; }
        public decimal? Target1 { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? AmbassadorId { get; set; }

        public virtual Ambassador Ambassador { get; set; }
    }
}
